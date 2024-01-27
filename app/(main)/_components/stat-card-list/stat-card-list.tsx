'use client';

import { Divider, SimpleGrid, Stack, Title } from '@mantine/core';
import { PiReceipt, PiUsers, PiTruck, PiHandshake, PiPause, PiTimer } from 'react-icons/pi';

import classes from './stat-card-list.module.css';
import StatCard from '../stat-card/stat-card';

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
      title: 'לקוחות',
      subtitle: 'כל הלקוחות',
      icon: <PiUsers className={classes.icon} />,
      value: customers,
    },
    {
      title: 'הזמנות',
      subtitle: 'כל ההזמנות',
      icon: <PiReceipt className={classes.icon} />,
      value: orders,
    },
  ] as const;

  const orderStats = [
    { title: 'ממתין ל', icon: <PiPause className={classes.icon} />, value: pendingOrders },
    { title: 'מעבד', icon: <PiTimer className={classes.icon} />, value: processingOrders },
    { title: 'נשלח', icon: <PiTruck className={classes.icon} />, value: shippedOrders },
    { title: 'נמסר', icon: <PiHandshake className={classes.icon} />, value: deliveredOrders },
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
          />
        ))}
      </SimpleGrid>

      <Stack gap={8}>
        <Divider />
        <Title size="h6" tt="uppercase" c="dimmed">
          מעקב אחר הזמנות
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
