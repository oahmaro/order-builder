import Image from 'next/image';
import { Button, Stack, Text } from '@mantine/core';

import { Link } from '@/components';
import { ordersTableContent, OrdersTableContentPhrases } from '../orders-table.content';

export interface OrdersTableEmptyStateProps {}

export default function OrdersTableEmptyState() {
  return (
    <Stack justify="center" align="center">
      <Stack align="center" justify="center" p={24}>
        <Image src="/empty.svg" width={240} height={120} alt="Empty results" />

        <Stack align="center" justify="center" gap={0} maw={320} ta="center">
          <Text fw={600} fz="xl" c="gray.7">
            {ordersTableContent.t(OrdersTableContentPhrases.NO_ORDERS_FOUND)}
          </Text>

          <Text c="dimmed">
            {ordersTableContent.t(OrdersTableContentPhrases.NO_ORDERS_FOUND_DESCRIPTION)}
          </Text>
        </Stack>

        <Button variant="light" component={Link} href="/orders/create">
          {ordersTableContent.t(OrdersTableContentPhrases.CREATE_ORDER)}
        </Button>
      </Stack>
    </Stack>
  );
}
