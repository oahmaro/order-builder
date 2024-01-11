import { Stack } from '@mantine/core';
import { OrderHeaderCard, OrderItemCard } from '../components';

export default function CreateOrderPage() {
  return (
    <Stack>
      <OrderHeaderCard />
      <OrderItemCard />
    </Stack>
  );
}
