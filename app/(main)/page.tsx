import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { StatCardList, TopNavMenu } from './_components';
import { getChartData } from './_actions/get-chart-data';
import { StatChartData } from './_components/stat-card/stat-card';

export default async function HomePage() {
  const totalCustomers = await db.customer.count();
  const totalOrders = await db.order.count();

  const pendingOrders = await db.order.count({
    where: { status: 'PENDING' },
  });

  const processingOrders = await db.order.count({
    where: { status: 'PROCESSING' },
  });

  const deliveredOrders = await db.order.count({
    where: { status: 'DELIVERED' },
  });

  const shippedOrders = await db.order.count({
    where: { status: 'SHIPPED' },
  });

  return (
    <Stack gap="lg">
      <TopNavMenu />

      <StatCardList
        customers={totalCustomers}
        orders={totalOrders}
        pendingOrders={pendingOrders}
        processingOrders={processingOrders}
        deliveredOrders={deliveredOrders}
        shippedOrders={shippedOrders}
        onFetchChartData={
          getChartData as unknown as (
            metric: string,
            dateRange: [Date | null, Date | null],
            metricLabel: string
          ) => Promise<{ data: StatChartData[]; error?: string }>
        }
      />
    </Stack>
  );
}
