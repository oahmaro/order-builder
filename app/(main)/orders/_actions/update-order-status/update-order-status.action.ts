'use server';

import { revalidatePath } from 'next/cache';
import { OrderStatus } from '@prisma/client';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import {
  updateOrderStatusContent,
  UpdateOrderStatusContentPhrases,
} from './update-order-status.content';

type UpdateStatusResponse = {
  message: string;
  error?: string;
};

export async function updateOrderStatusAction(
  orderId: number,
  newStatus: OrderStatus
): Promise<UpdateStatusResponse> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.UNAUTHORIZED),
      error: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.UNAUTHORIZED),
    };
  }

  try {
    // Get the old order data for audit
    const oldOrder = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!oldOrder) {
      return {
        message: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.ORDER_NOT_FOUND),
        error: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.ORDER_NOT_FOUND),
      };
    }

    // Update the order status
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: orderId,
        entityType: 'Order',
        action: 'UPDATE_STATUS',
        userId: Number(session.user.id),
        changes: JSON.stringify({
          before: { status: oldOrder.status },
          after: { status: updatedOrder.status },
        }),
      },
    });

    revalidatePath('/orders');

    return {
      message: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.STATUS_UPDATED),
    };
  } catch (error) {
    return {
      message: updateOrderStatusContent.t(UpdateOrderStatusContentPhrases.UPDATE_FAILED),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
