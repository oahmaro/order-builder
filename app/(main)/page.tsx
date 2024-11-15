import { Stack, Text, Title } from '@mantine/core';

import { db } from '@/lib/db';
import { StatCardList } from './_components';
import { homePageContent, HomePagePhrases } from './_content';
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
    <Stack m="0 auto">
      <Title order={1}>{homePageContent.t(HomePagePhrases.WELCOME_TITLE)}</Title>

      <Stack gap={0}>
        <Text c="dimmed">{homePageContent.t(HomePagePhrases.APP_DESCRIPTION)}</Text>

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
    </Stack>
  );
}
