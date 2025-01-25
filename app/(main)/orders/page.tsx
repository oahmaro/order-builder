import { Stack } from '@mantine/core';
import { OrderStatus } from '@prisma/client';

import { db } from '@/lib/db';
import { withAuditInfo } from '@/utils';
import { OrdersPageHeader, OrdersTable } from './_components';

interface OrdersPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function OrderPage({ searchParams }: OrdersPageProps) {
  const { sortBy, sortDir } = searchParams;

  const orders = await db.order.findMany({
    where: {
      status: searchParams.status ? (searchParams.status as OrderStatus) : undefined,
    },
    orderBy: sortBy
      ? sortBy === 'customerName'
        ? { customer: { firstName: sortDir === 'desc' ? 'desc' : 'asc' } }
        : sortBy === 'itemsCount'
        ? { orderItems: { _count: sortDir === 'desc' ? 'desc' : 'asc' } }
        : sortBy === 'createdBy'
        ? { createdAt: sortDir === 'desc' ? 'desc' : 'asc' }
        : sortBy === 'updatedBy'
        ? { updatedAt: sortDir === 'desc' ? 'desc' : 'asc' }
        : { [sortBy]: sortDir === 'desc' ? 'desc' : 'asc' }
      : undefined,
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
  });

  const ordersWithAudit = await withAuditInfo(orders, 'Order');
  const mappedOrders = ordersWithAudit.map((order, index) => ({
    ...orders[index],
    createdByUser: order.createdByUser,
    updatedByUser: order.updatedByUser,
    customer: {
      ...orders[index].customer,
      id: String(orders[index].customer.id),
    },
    orderItems: orders[index].orderItems,
  }));

  return (
    <Stack gap="lg">
      <OrdersPageHeader numberOfOrders={mappedOrders.length} />
      <OrdersTable orders={mappedOrders} />
    </Stack>
  );
}
