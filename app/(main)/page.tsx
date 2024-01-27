import { Stack, Text, Title } from '@mantine/core';

import { StatCardList } from './_components';
import { db } from '@/lib/db';

export default async function HomePage() {
  const totalCustomers = await db.customer.count();
  const totalOrders = await db.order.count();

  const pendingOrders = await db.order.count({
    where: {
      status: 'PENDING',
    },
  });

  const processingOrders = await db.order.count({
    where: {
      status: 'PROCESSING',
    },
  });

  const deliveredOrders = await db.order.count({
    where: {
      status: 'DELIVERED',
    },
  });

  const shippedOrders = await db.order.count({
    where: {
      status: 'SHIPPED',
    },
  });

  return (
    <Stack m="0 auto">
      <Title order={1}>ברוך הבא 👋</Title>

      <Stack gap={0}>
        <Text c="dimmed">
          אפליקציה זו פותרת את ניהול, יצירה ומעקב הזמנות בקלות, ומציעה יכולת להדפיסן בקלות. פשוט את
          התהליכים שלך ושמור על סדר בצורה יעילה.
        </Text>

        <StatCardList
          customers={totalCustomers}
          orders={totalOrders}
          pendingOrders={pendingOrders}
          processingOrders={processingOrders}
          deliveredOrders={deliveredOrders}
          shippedOrders={shippedOrders}
        />
      </Stack>
    </Stack>
  );
}
