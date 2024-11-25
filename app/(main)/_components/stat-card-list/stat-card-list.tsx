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
        new: setPendingChartData,
        in_progress: setProcessingChartData,
        ready: setShippedChartData,
        completed: setDeliveredChartData,
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

    const metrics = ['customers', 'orders', 'new', 'in_progress', 'ready', 'completed'];

    metrics.forEach((metric) => {
      const label = statCardListContent.t(
        StatCardListPhrases[metric.toUpperCase() as keyof typeof StatCardListPhrases]
      );

      handleDateRangeChange(metric, [startDate, endDate], label);
    });
  }, [handleDateRangeChange]);

  const orderStats = [
    {
      metric: 'new',
      value: pendingOrders,
      chartData: pendingChartData,
      icon: <PiPause className={classes.icon} />,
      title: statCardListContent.t(StatCardListPhrases.NEW),
      href: '/orders?page=1&pageSize=10&sortBy=id&sortDir=asc&status=NEW',
      valueLabel: statCardListContent.t(StatCardListPhrases.NEW_ORDERS),
    },
    {
      metric: 'in_progress',
      value: processingOrders,
      chartData: processingChartData,
      icon: <PiTimer className={classes.icon} />,
      title: statCardListContent.t(StatCardListPhrases.IN_PROGRESS),
      href: '/orders?page=1&pageSize=10&sortBy=id&sortDir=asc&status=IN_PROGRESS',
      valueLabel: statCardListContent.t(StatCardListPhrases.IN_PROGRESS_ORDERS),
    },
    {
      metric: 'ready',
      value: shippedOrders,
      chartData: shippedChartData,
      icon: <PiTruck className={classes.icon} />,
      title: statCardListContent.t(StatCardListPhrases.READY),
      href: '/orders?page=1&pageSize=10&sortBy=id&sortDir=asc&status=READY',
      valueLabel: statCardListContent.t(StatCardListPhrases.READY_ORDERS),
    },
    {
      metric: 'completed',
      value: deliveredOrders,
      chartData: deliveredChartData,
      icon: <PiHandshake className={classes.icon} />,
      title: statCardListContent.t(StatCardListPhrases.COMPLETED),
      href: '/orders?page=1&pageSize=10&sortBy=id&sortDir=asc&status=COMPLETED',
      valueLabel: statCardListContent.t(StatCardListPhrases.COMPLETED_ORDERS),
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
                href="/customers?page=1&pageSize=10&sortBy=id&sortDir=asc"
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
                href="/orders?page=1&pageSize=10&sortBy=id&sortDir=asc"
                title={statCardListContent.t(StatCardListPhrases.ORDERS)}
                subtitle={statCardListContent.t(StatCardListPhrases.ALL_ORDERS)}
                onDateRangeChange={(range) =>
                  handleDateRangeChange(
                    'orders',
                    range,
                    statCardListContent.t(StatCardListPhrases.ORDERS)
                  )
                }
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
                  icon={stat.icon}
                  href={stat.href}
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  defaultExpanded={false}
                  metricName={stat.title}
                  chartData={stat.chartData}
                  onDateRangeChange={(range) => {
                    const label = statCardListContent.t(
                      StatCardListPhrases[
                        stat.metric.toUpperCase() as keyof typeof StatCardListPhrases
                      ]
                    );

                    handleDateRangeChange(stat.metric, range, label);
                  }}
                />
              ))}
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
