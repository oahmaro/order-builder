'use server';

import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@prisma/client';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { uploadImageAction } from './upload-image.action';
import { orderFormSchema } from '../_components/order-form/order-form.schema';

import {
  orderFormContent,
  OrderFormContentPhrases,
} from '../_components/order-form/order-form.content';
import { deleteImageAction } from './delete-image.action';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateOrderAction(data: FormData): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  try {
    const orderId = parseInt(data.get('orderId') as string, 10);
    const orderItems = JSON.parse(data.get('orderItems') as string);

    const parsed = orderFormSchema.safeParse({
      customerId: parseInt(data.get('customerId') as string, 10),
      amountPaid: parseFloat(data.get('amountPaid') as string),
      status: data.get('status') as OrderStatus,
      orderItems,
    });

    if (!parsed.success) {
      return {
        message: orderFormContent.t(OrderFormContentPhrases.FORM_DATA_INVALID),
        errors: parsed.error.errors,
      };
    }

    // Get the old order for audit and image handling
    const oldOrder = await db.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });

    if (!oldOrder) {
      return {
        message: 'Order not found',
      };
    }

    // First check for removed images and delete them from storage
    await Promise.all(
      oldOrder.orderItems.map(async (oldItem, index) => {
        const newItemImage = orderItems[index]?.image;

        // If old item had an image and new item either has no image or a different image
        if (oldItem.image && (!newItemImage || newItemImage === null)) {
          await deleteImageAction(oldItem.image);
        }
      })
    );

    // Then handle new image uploads and get URLs
    const imageResults = await Promise.all(
      orderItems.map(async (item: any, index: number) => {
        const imageFile = data.get(`orderItem${index}Image`) as File;

        // If no new image file, keep existing image (unless explicitly set to null)
        if (!imageFile) {
          return item.image === null ? null : oldOrder.orderItems[index]?.image;
        }

        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        imageFormData.append('orderItemIndex', index.toString());
        imageFormData.append('orderId', orderId.toString());

        const uploadResult = await uploadImageAction(imageFormData);
        if (uploadResult.error) {
          throw new Error(`Image upload failed: ${uploadResult.error}`);
        }

        // If there was an old image, delete it since we're uploading a new one
        if (oldOrder.orderItems[index]?.image) {
          await deleteImageAction(oldOrder.orderItems[index].image);
        }

        return uploadResult.url;
      })
    );

    // Update order with all data including new images in a single transaction
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        customerId: parsed.data.customerId,
        status: parsed.data.status,
        amountPaid: parsed.data.amountPaid,
        orderItems: {
          deleteMany: {},
          create: parsed.data.orderItems.map((item, index) => ({
            height: item.height || 0,
            width: item.width || 0,
            frame: item.frameId ? { connect: { id: item.frameId } } : undefined,
            passepartout: item.passepartoutId
              ? { connect: { id: item.passepartoutId } }
              : undefined,
            passepartoutWidth: item.passepartoutWidth || 0,
            glassTypes: JSON.stringify(item.glassTypes),
            adhesions: {
              connect: item.adhesionIds?.map((id) => ({ id })) || [],
            },
            prints: {
              connect: item.printIds?.map((id) => ({ id })) || [],
            },
            descriptions: {
              connect: item.descriptionIds?.map((id) => ({ id })) || [],
            },
            notes: item.notes || undefined,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            image: imageResults[index],
            orderIndex: index,
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            adhesions: true,
            prints: true,
            descriptions: true,
          },
        },
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: orderId,
        entityType: 'Order',
        action: 'UPDATE',
        userId: Number(session.user.id),
        changes: JSON.parse(
          JSON.stringify({
            before: oldOrder,
            after: updatedOrder,
          })
        ),
      },
    });

    revalidatePath('/orders');

    return {
      message: orderFormContent.t(OrderFormContentPhrases.ORDER_UPDATED),
    };
  } catch (error) {
    return {
      message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_UPDATING),
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}
