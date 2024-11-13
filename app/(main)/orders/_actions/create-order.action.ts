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

  const formData = Object.fromEntries(data);
  const customerId = parseInt(formData.customerId as string, 10);
  const amountPaid = parseFloat(formData.amountPaid as string);
  const status = formData.status as OrderStatus;
  const orderItems = JSON.parse(formData.orderItems as string);

  const parsed = orderFormSchema.safeParse({
    customerId,
    amountPaid: Number(amountPaid),
    status,
    orderItems,
  });

  if (!parsed.success) {
    return {
      message: orderFormContent.t(OrderFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  try {
    const createdOrder = await db.order.create({
      data: {
        customerId: parsed.data.customerId,
        status: parsed.data.status,
        amountPaid: parsed.data.amountPaid,
        orderItems: {
          create: parsed.data.orderItems.map((item) => ({
            height: item.height,
            width: item.width,
            frame: item.frameId ? { connect: { id: item.frameId } } : undefined,
            passepartoutNum: item.passepartoutNum || 0,
            passepartoutWidth: item.passepartoutWidth || 0,
            glassTypes: JSON.stringify(item.glassTypes),
            adhesion: item.adhesionId ? { connect: { id: item.adhesionId } } : undefined,
            print: item.printId ? { connect: { id: item.printId } } : undefined,
            description: item.descriptionId ? { connect: { id: item.descriptionId } } : undefined,
            notes: item.notes || undefined,
            image: item.image || undefined,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
        customer: true,
      },
    });

    // Create audit entry
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
    };
  }
}
