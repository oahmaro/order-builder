import { Stack } from '@mantine/core';
import { OrderHeaderCard, OrderItemCard } from '../_components';

export default function CreateOrderPage() {
  return (
    <Stack>
      <OrderHeaderCard orderNumber={123} />
      <OrderItemCard />
    </Stack>
  );
}
