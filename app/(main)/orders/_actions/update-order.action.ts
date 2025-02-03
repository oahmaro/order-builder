'use server';

import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@prisma/client';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { orderFormSchema } from '../_components/order-form/order-form.schema';

import {
  orderFormContent,
  OrderFormContentPhrases,
} from '../_components/order-form/order-form.content';
import { deleteImageAction } from './delete-image.action';
import { batchUploadImagesAction } from './batch-upload-images.action';

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
        orderItems: {
          orderBy: {
            orderIndex: 'asc',
          },
        },
      },
    });

    if (!oldOrder) {
      return {
        message: 'Order not found',
      };
    }

    // Handle new image uploads
    const imageResults = await batchUploadImagesAction(data, orderId);
    if (imageResults.error) {
      throw new Error(`Image upload failed: ${imageResults.error}`);
    }

    // Delete old images that are being replaced or removed
    await Promise.all(
      oldOrder.orderItems.map(async (oldItem, index) => {
        const newUrl = imageResults.urls[index];
        if (oldItem.image && (newUrl || orderItems[index].image === null)) {
          await deleteImageAction(oldItem.image);
        }
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
            orderIndex: index,
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
            image:
              imageResults.urls[index] ||
              (orderItems[index].image === null ? null : oldOrder.orderItems[index]?.image),
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
          orderBy: {
            orderIndex: 'asc',
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
