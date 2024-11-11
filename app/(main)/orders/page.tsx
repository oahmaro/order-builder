import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { OrdersPageHeader, OrdersTable } from './_components';

export default async function OrderPage() {
  const orders = await db.order.findMany({
    include: {
      customer: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      _count: {
        select: {
          orderItems: true,
        },
      },
    },
  });

  return (
    <Stack gap="lg">
      <OrdersPageHeader numberOfOrders={orders.length} />
      <OrdersTable orders={orders} />
    </Stack>
  );
}
