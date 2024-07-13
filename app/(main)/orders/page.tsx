import { Stack } from '@mantine/core';
import Polyglot from 'node-polyglot';
import { Order } from '@prisma/client';
import { OrdersTable, TableFooter } from '@/components';
import { db } from '@/lib/db';
import { PageHeader } from '@/components/page-header';

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { orders: '%{smart_count} הזמנה |||| %{smart_count} הזמנות' },
});

export default async function OrderPage() {
  let orders: Order[] = [];

  try {
    orders = await db.order.findMany();
  } catch (error) {
    return <div>Failed to fetch orders!</div>;
  }

  return (
    <Stack gap="lg">
      <PageHeader
        title="הזמנות"
        subtitle={polyglot.t('orders', orders.length)}
        action={{ label: 'צור ערך חדש', link: '/orders/create' }}
        backPath="/"
      />

      <Stack gap={16}>
        <OrdersTable orders={orders} />
        <TableFooter />
      </Stack>
    </Stack>
  );
}
