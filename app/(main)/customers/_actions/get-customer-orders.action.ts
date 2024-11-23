'use server';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';

export async function getCustomerOrders(customerId: number) {
  const orders = await db.order
    .findMany({
      where: {
        customerId,
      },
      include: {
        customer: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
            phones: true,
          },
        },
        orderItems: true,
      },
    })
    .then((rawOrders) =>
      rawOrders.map((order) => ({
        ...order,
        customer: {
          ...order.customer,
          id: String(order.customer.id),
        },
      }))
    );

  return withAuditInfo(orders, 'Order');
}
