import { Button, Divider, Group, Stack } from '@mantine/core';
import { OrderHeaderCard, OrderItemCard } from '../_components';

export default function CreateOrderPage() {
  return (
    <Stack>
      <OrderHeaderCard orderNumber={123} />
      <OrderItemCard />

      <Group gap={56}>
        <Divider flex={1} />
        <Button variant="subtle" color="gray">
          Add Order
        </Button>
        <Divider flex={1} />
      </Group>
    </Stack>
  );
}
