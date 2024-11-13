'use client';

import { useCallback, useState, useEffect } from 'react';
import { Divider, SimpleGrid, Stack, Title } from '@mantine/core';
import { PiReceipt, PiUsers, PiTruck, PiHandshake, PiPause, PiTimer } from 'react-icons/pi';

import StatCard, { StatChartData } from '../stat-card/stat-card';
import classes from './stat-card-list.module.css';
import { statCardListContent, StatCardListPhrases } from './stat-card-list.content';

interface StatCardListProps {
  customers: number;
  orders: number;
  pendingOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  shippedOrders: number;
  onFetchChartData: (
    metric: string,
    dateRange: [Date | null, Date | null]
  ) => Promise<{ data: StatChartData[]; error?: string }>;
}

export default function StatCardList({
  customers,
  orders,
  pendingOrders,
  processingOrders,
  deliveredOrders,
  shippedOrders,
  onFetchChartData,
}: StatCardListProps) {
  const [customersChartData, setCustomersChartData] = useState<StatChartData[]>([]);
  const [ordersChartData, setOrdersChartData] = useState<StatChartData[]>([]);
  const [pendingChartData, setPendingChartData] = useState<StatChartData[]>([]);
  const [processingChartData, setProcessingChartData] = useState<StatChartData[]>([]);
  const [shippedChartData, setShippedChartData] = useState<StatChartData[]>([]);
  const [deliveredChartData, setDeliveredChartData] = useState<StatChartData[]>([]);

  const handleDateRangeChange = useCallback(
    async (metric: string, range: [Date | null, Date | null]) => {
      const { data, error } = await onFetchChartData(metric, range);

      if (error) {
        return;
      }

      const chartDataSetters: Record<string, (data: StatChartData[]) => void> = {
        customers: setCustomersChartData,
        orders: setOrdersChartData,
        pending: setPendingChartData,
        processing: setProcessingChartData,
        shipped: setShippedChartData,
        delivered: setDeliveredChartData,
      };

      const setter = chartDataSetters[metric];
      if (setter) {
        setter(data);
      }
    },
    [onFetchChartData]
  );

  useEffect(() => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);

    const metrics = ['customers', 'orders', 'pending', 'processing', 'shipped', 'delivered'];
    metrics.forEach((metric) => {
      handleDateRangeChange(metric, [startDate, endDate]);
    });
  }, [handleDateRangeChange]);

  const orderStats = [
    {
      title: statCardListContent.t(StatCardListPhrases.PENDING),
      icon: <PiPause className={classes.icon} />,
      value: pendingOrders,
      chartData: pendingChartData,
      metric: 'pending',
    },
    {
      title: statCardListContent.t(StatCardListPhrases.PROCESSING),
      icon: <PiTimer className={classes.icon} />,
      value: processingOrders,
      chartData: processingChartData,
      metric: 'processing',
    },
    {
      title: statCardListContent.t(StatCardListPhrases.SHIPPED),
      icon: <PiTruck className={classes.icon} />,
      value: shippedOrders,
      chartData: shippedChartData,
      metric: 'shipped',
    },
    {
      title: statCardListContent.t(StatCardListPhrases.DELIVERED),
      icon: <PiHandshake className={classes.icon} />,
      value: deliveredOrders,
      chartData: deliveredChartData,
      metric: 'delivered',
    },
  ] as const;

  return (
    <Stack className={classes.root} gap={32}>
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        <StatCard
          defaultExpanded
          value={customers}
          chartData={customersChartData}
          icon={<PiUsers className={classes.icon} />}
          href="/customers?page=1&pageSize=10&sort=name:ASC"
          title={statCardListContent.t(StatCardListPhrases.CUSTOMERS)}
          subtitle={statCardListContent.t(StatCardListPhrases.ALL_CUSTOMERS)}
          onDateRangeChange={(range) => handleDateRangeChange('customers', range)}
        />
        <StatCard
          value={orders}
          defaultExpanded
          chartData={ordersChartData}
          icon={<PiReceipt className={classes.icon} />}
          href="/orders?page=1&pageSize=10&sort=createdAt:DESC"
          title={statCardListContent.t(StatCardListPhrases.ORDERS)}
          subtitle={statCardListContent.t(StatCardListPhrases.ALL_ORDERS)}
          onDateRangeChange={(range) => handleDateRangeChange('orders', range)}
        />
      </SimpleGrid>

      <Stack gap={8}>
        <Divider />
        <Title size="h6" tt="uppercase" c="dimmed">
          {statCardListContent.t(StatCardListPhrases.ORDER_TRACKING)}
        </Title>
      </Stack>

      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        {orderStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            chartData={stat.chartData}
            onDateRangeChange={(range) => handleDateRangeChange(stat.metric, range)}
            defaultExpanded={false}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
