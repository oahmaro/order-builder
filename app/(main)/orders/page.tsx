import { Stack } from '@mantine/core';
import { OrderStatus } from '@prisma/client';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';
import { OrdersPageHeader, OrdersTable } from './_components';

interface OrdersPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function OrderPage({ searchParams }: OrdersPageProps) {
  const orders = await db.order
    .findMany({
      where: {
        status: searchParams.status ? (searchParams.status as OrderStatus) : undefined,
      },
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
