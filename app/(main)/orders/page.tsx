import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';
import { OrdersPageHeader, OrdersTable } from './_components';

export default async function OrderPage() {
  const orders = await db.order
    .findMany({
      include: {
        customer: {
          select: {
            id: true,
            lastName: true,
            firstName: true,
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

  const ordersWithAudit = await withAuditInfo(orders, 'Order');

  return (
    <Stack gap="lg">
      <OrdersPageHeader numberOfOrders={ordersWithAudit.length} />
      <OrdersTable orders={ordersWithAudit} />
    </Stack>
  );
}
