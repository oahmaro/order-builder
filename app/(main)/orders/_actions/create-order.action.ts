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
import { batchUploadImagesAction } from './batch-upload-images.action';

type FormState = {
  message: string;
  errors?: any[];
  orderId?: number;
};

export async function createOrderAction(data: FormData): Promise<FormState> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  try {
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

    // First create the order and items
    const createdOrder = await db.order.create({
      data: {
        customerId: parsed.data.customerId,
        status: parsed.data.status,
        amountPaid: parsed.data.amountPaid,
        orderItems: {
          create: parsed.data.orderItems.map((item, index) => ({
            orderIndex: index,
            height: item.height ?? 0,
            width: item.width ?? 0,
            frame: item.frameId ? { connect: { id: item.frameId } } : undefined,
            passepartout: item.passepartoutId
              ? { connect: { id: item.passepartoutId } }
              : undefined,
            passepartoutWidth: item.passepartoutWidth || 0,
            glassTypes: JSON.stringify(item.glassTypes),
            adhesions: item.adhesionIds?.length
              ? { connect: item.adhesionIds.map((id) => ({ id })) }
              : undefined,
            prints: item.printIds?.length
              ? { connect: item.printIds.map((id) => ({ id })) }
              : undefined,
            descriptions: item.descriptionIds?.length
              ? { connect: item.descriptionIds.map((id) => ({ id })) }
              : undefined,
            notes: item.notes || undefined,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
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

    // Handle image uploads
    const imageResults = await batchUploadImagesAction(data, createdOrder.id);
    if (imageResults.error) {
      return {
        message: `${orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED)} ${orderFormContent.t(
          OrderFormContentPhrases.IMAGE_UPLOAD_FAILED
        )}`,
      };
    }

    // Update order items with image URLs
    await Promise.all(
      imageResults.urls.map((url, index) => {
        if (!url) return Promise.resolve();
        return db.orderItem.update({
          where: { id: createdOrder.orderItems[index].id },
          data: { image: url },
        });
      })
    );

    // Create audit entry and finish
    await db.audit.create({
      data: {
        entityId: createdOrder.id,
        entityType: 'Order',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(createdOrder)),
      },
    });

    revalidatePath('/orders');

    return {
      message: orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED),
      orderId: createdOrder.id,
    };
  } catch (error) {
    return {
      message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_CREATING),
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}
