import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { Order, PrismaClient } from '@prisma/client';
import Polyglot from 'node-polyglot';
import Link from 'next/link';
import { OrdersTable, TableFooter } from '@/components';

const prisma = new PrismaClient();

const polyglot = new Polyglot({
  locale: 'he',
  phrases: { orders: '%{smart_count} הזמנה |||| %{smart_count} הזמנות' },
});

export default async function OrderListPage() {
  let orders: Order[] = [];

  try {
    orders = await prisma.order.findMany();
  } catch (error) {
    return <div>Failed to fetch orders!</div>;
  }

  return (
    <Stack gap={40}>
      <Group justify="space-between" align="flex-start">
        <Stack gap={0}>
          <Title order={1}>הזמנות</Title>
          <Text c="dimmed">{polyglot.t('orders', orders.length)}</Text>
        </Stack>

        <Button component={Link} mt={8} href="/orders/create">
          צור ערך חדש
        </Button>
      </Group>

      <Stack gap={16}>
        <OrdersTable orders={orders} />
        <TableFooter />
      </Stack>
    </Stack>
  );
}
