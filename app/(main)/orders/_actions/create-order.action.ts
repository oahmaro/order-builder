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
          create: parsed.data.orderItems.map((item) => ({
            height: item.height ?? 0,
            width: item.width ?? 0,
            frame: item.frameId ? { connect: { id: item.frameId } } : undefined,
            passepartoutNum: item.passepartoutNum || 0,
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
        orderItems: true,
      },
    });

    // Then handle image uploads with proper IDs
    try {
      await Promise.all(
        orderItems.map(async (item: any, index: number) => {
          const imageFile = data.get(`orderItem${index}Image`) as File;
          const orderItem = createdOrder.orderItems[index];

          if (imageFile && orderItem) {
            const imageFormData = new FormData();
            imageFormData.append('file', imageFile);
            imageFormData.append('orderItemIndex', index.toString());
            imageFormData.append('orderId', createdOrder.id.toString());
            imageFormData.append('orderItemId', orderItem.id.toString());

            const uploadResult = await uploadImageAction(imageFormData);
            if (uploadResult.error) {
              throw new Error(`Image upload failed: ${uploadResult.error}`);
            }

            // Update the order item with the image URL
            await db.orderItem.update({
              where: { id: orderItem.id },
              data: { image: uploadResult.url },
            });
          }
        })
      );
    } catch (error) {
      // Return success but with warning about image upload
      return {
        message: `${orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED)} ${orderFormContent.t(
          OrderFormContentPhrases.IMAGE_UPLOAD_FAILED
        )}`,
      };
    }

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
    };
  } catch (error) {
    return {
      message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_CREATING),
      errors: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}
