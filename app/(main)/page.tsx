import { Stack } from '@mantine/core';

import { db } from '@/lib/db';
import { StatCardList, TopNavMenu } from './_components';
import { getChartData } from './_actions/get-chart-data';
import { StatChartData } from './_components/stat-card/stat-card';

export default async function HomePage() {
  const totalCustomers = await db.customer.count();
  const totalOrders = await db.order.count();

  const newOrders = await db.order.count({
    where: { status: 'NEW' },
  });

  const completedOrders = await db.order.count({
    where: { status: 'COMPLETED' },
  });

  return (
    <Stack gap="lg">
      <TopNavMenu />

      <StatCardList
        customers={totalCustomers}
        orders={totalOrders}
        newOrders={newOrders}
        completedOrders={completedOrders}
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
