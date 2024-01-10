import { Button, Group, Stack, Text, Title } from '@mantine/core';
import { OrdersTable } from '@/components';

export default function OrderListPage() {
  return (
    <Stack gap={40}>
      <Group justify="space-between">
        <Stack gap={0}>
          <Title order={1}>הזמנות</Title>
          <Text c="dimmed">3 הזמנות שנמצאו</Text>
        </Stack>

        <Button>צור ערך חדש</Button>
      </Group>

      <OrdersTable />
    </Stack>
  );
}
