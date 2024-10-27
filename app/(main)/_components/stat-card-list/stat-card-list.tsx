'use client';

import { Divider, SimpleGrid, Stack, Title } from '@mantine/core';
import { PiReceipt, PiUsers, PiTruck, PiHandshake, PiPause, PiTimer } from 'react-icons/pi';

import StatCard from '../stat-card/stat-card';
import classes from './stat-card-list.module.css';
import { statCardListContent, StatCardListPhrases } from './stat-card-list.content';

export interface StatCardListProps {
  customers: number;
  orders: number;
  pendingOrders: number;
  processingOrders: number;
  deliveredOrders: number;
  shippedOrders: number;
}

export default function StatCardList({
  customers,
  orders,
  pendingOrders,
  processingOrders,
  shippedOrders,
  deliveredOrders,
}: StatCardListProps) {
  const generalStats = [
    {
      title: statCardListContent.t(StatCardListPhrases.CUSTOMERS),
      subtitle: statCardListContent.t(StatCardListPhrases.ALL_CUSTOMERS),
      icon: <PiUsers className={classes.icon} />,
      value: customers,
      href: '/customers?page=1&pageSize=10&sort=name:ASC',
    },
    {
      title: statCardListContent.t(StatCardListPhrases.ORDERS),
      subtitle: statCardListContent.t(StatCardListPhrases.ALL_ORDERS),
      icon: <PiReceipt className={classes.icon} />,
      value: orders,
      href: '/orders?page=1&pageSize=10&sort=createdAt:DESC',
    },
  ] as const;

  const orderStats = [
    {
      title: statCardListContent.t(StatCardListPhrases.PENDING),
      icon: <PiPause className={classes.icon} />,
      value: pendingOrders,
    },
    {
      title: statCardListContent.t(StatCardListPhrases.PROCESSING),
      icon: <PiTimer className={classes.icon} />,
      value: processingOrders,
    },
    {
      title: statCardListContent.t(StatCardListPhrases.SHIPPED),
      icon: <PiTruck className={classes.icon} />,
      value: shippedOrders,
    },
    {
      title: statCardListContent.t(StatCardListPhrases.DELIVERED),
      icon: <PiHandshake className={classes.icon} />,
      value: deliveredOrders,
    },
  ] as const;

  return (
    <Stack className={classes.root} gap={32}>
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        {generalStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            icon={stat.icon}
            href={stat.href}
          />
        ))}
      </SimpleGrid>

      <Stack gap={8}>
        <Divider />
        <Title size="h6" tt="uppercase" c="dimmed">
          {statCardListContent.t(StatCardListPhrases.ORDER_TRACKING)}
        </Title>
      </Stack>

      <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }}>
        {orderStats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
