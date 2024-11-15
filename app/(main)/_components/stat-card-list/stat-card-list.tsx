'use client';

import { useCallback, useState, useEffect } from 'react';
import { Accordion, SimpleGrid, Stack } from '@mantine/core';
import { PiReceipt, PiUsers, PiTruck, PiHandshake, PiPause, PiTimer } from 'react-icons/pi';

import classes from './stat-card-list.module.css';
import StatCard, { StatChartData } from '../stat-card/stat-card';
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
    dateRange: [Date | null, Date | null],
    metricLabel: string
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
    async (metric: string, range: [Date | null, Date | null], metricLabel: string) => {
      const { data, error } = await onFetchChartData(metric, range, metricLabel);

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
    startDate.setDate(endDate.getDate() - 7);

    const metrics = ['customers', 'orders', 'pending', 'processing', 'shipped', 'delivered'];
    metrics.forEach((metric) => {
      const label = statCardListContent.t(
        StatCardListPhrases[metric.toUpperCase() as keyof typeof StatCardListPhrases]
      );
      handleDateRangeChange(metric, [startDate, endDate], label);
    });
  }, [handleDateRangeChange]);

  const orderStats = [
    {
      title: statCardListContent.t(StatCardListPhrases.PENDING),
      icon: <PiPause className={classes.icon} />,
      value: pendingOrders,
      chartData: pendingChartData,
      metric: 'pending',
      valueLabel: statCardListContent.t(StatCardListPhrases.PENDING_ORDERS),
    },
    {
      title: statCardListContent.t(StatCardListPhrases.PROCESSING),
      icon: <PiTimer className={classes.icon} />,
      value: processingOrders,
      chartData: processingChartData,
      metric: 'processing',
      valueLabel: statCardListContent.t(StatCardListPhrases.PROCESSING_ORDERS),
    },
    {
      title: statCardListContent.t(StatCardListPhrases.SHIPPED),
      icon: <PiTruck className={classes.icon} />,
      value: shippedOrders,
      chartData: shippedChartData,
      metric: 'shipped',
      valueLabel: statCardListContent.t(StatCardListPhrases.SHIPPED_ORDERS),
    },
    {
      title: statCardListContent.t(StatCardListPhrases.DELIVERED),
      icon: <PiHandshake className={classes.icon} />,
      value: deliveredOrders,
      chartData: deliveredChartData,
      metric: 'delivered',
      valueLabel: statCardListContent.t(StatCardListPhrases.DELIVERED_ORDERS),
    },
  ] as const;

  return (
    <Stack className={classes.root} gap={32}>
      <Accordion
        variant="separated"
        defaultValue={['overview', 'orderTracking']}
        multiple
        classNames={{
          item: classes.accordionItem,
          panel: classes.accordionPanel,
          control: classes.accordionControl,
          content: classes.accordionContent,
        }}
      >
        <Accordion.Item value="overview">
          <Accordion.Control>
            {statCardListContent.t(StatCardListPhrases.OVERVIEW)}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              <StatCard
                defaultExpanded
                value={customers}
                chartData={customersChartData}
                icon={<PiUsers className={classes.icon} />}
                href="/customers?page=1&pageSize=10&sort=name:ASC"
                title={statCardListContent.t(StatCardListPhrases.CUSTOMERS)}
                subtitle={statCardListContent.t(StatCardListPhrases.ALL_CUSTOMERS)}
                onDateRangeChange={(range) =>
                  handleDateRangeChange(
                    'customers',
                    range,
                    statCardListContent.t(StatCardListPhrases.CUSTOMERS)
                  )
                }
                metricName={statCardListContent.t(StatCardListPhrases.CUSTOMERS)}
              />

              <StatCard
                value={orders}
                defaultExpanded
                chartData={ordersChartData}
                icon={<PiReceipt className={classes.icon} />}
                href="/orders?page=1&pageSize=10&sort=createdAt:DESC"
                title={statCardListContent.t(StatCardListPhrases.ORDERS)}
                subtitle={statCardListContent.t(StatCardListPhrases.ALL_ORDERS)}
                onDateRangeChange={(range) => handleDateRangeChange('orders', range, 'value')}
                metricName={statCardListContent.t(StatCardListPhrases.ORDERS)}
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="orderTracking">
          <Accordion.Control>
            {statCardListContent.t(StatCardListPhrases.ORDER_TRACKING)}
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={{ base: 1, xs: 2 }}>
              {orderStats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  chartData={stat.chartData}
                  onDateRangeChange={(range) => handleDateRangeChange(stat.metric, range, 'value')}
                  defaultExpanded={false}
                  metricName={stat.title}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
