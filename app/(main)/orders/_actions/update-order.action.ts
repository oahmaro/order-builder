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
    const customerId = parseInt(data.get('customerId') as string, 10);
    const amountPaid = parseFloat(data.get('amountPaid') as string);
    const status = data.get('status') as OrderStatus;
    const orderItems = JSON.parse(data.get('orderItems') as string);

    const parsed = orderFormSchema.safeParse({
      customerId,
      amountPaid,
      status,
      orderItems,
    });

    if (!parsed.success) {
      return {
        message: orderFormContent.t(OrderFormContentPhrases.FORM_DATA_INVALID),
        errors: parsed.error.errors,
      };
    }

    // Get the old order for audit
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

    // Update order and recreate all order items
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
            passepartoutNum: item.passepartoutNum || 0,
            passepartoutWidth: item.passepartoutWidth || 0,
            glassTypes: JSON.stringify(item.glassTypes),
            adhesion: item.adhesionId ? { connect: { id: item.adhesionId } } : undefined,
            print: item.printId ? { connect: { id: item.printId } } : undefined,
            description: item.descriptionId ? { connect: { id: item.descriptionId } } : undefined,
            notes: item.notes || undefined,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            image: item.image === null ? null : oldOrder.orderItems[index]?.image || undefined,
            orderIndex: index,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Handle image uploads
    try {
      await Promise.all(
        orderItems.map(async (item: any, index: number) => {
          const imageFile = data.get(`orderItem${index}Image`) as File;
          const orderItem = updatedOrder.orderItems[index];

          if (imageFile && orderItem) {
            const imageFormData = new FormData();
            imageFormData.append('file', imageFile);
            imageFormData.append('orderItemIndex', index.toString());
            imageFormData.append('orderId', updatedOrder.id.toString());
            imageFormData.append('orderItemId', orderItem.id.toString());

            const uploadResult = await uploadImageAction(imageFormData);
            if (uploadResult.error) {
              throw new Error(`Image upload failed: ${uploadResult.error}`);
            }

            await db.orderItem.update({
              where: { id: orderItem.id },
              data: { image: uploadResult.url },
            });
          }
        })
      );
    } catch (error) {
      return {
        message: `${orderFormContent.t(OrderFormContentPhrases.ORDER_UPDATED)} ${orderFormContent.t(
          OrderFormContentPhrases.IMAGE_UPLOAD_FAILED
        )}`,
      };
    }

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
