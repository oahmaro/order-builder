'use client';

import { Divider, SimpleGrid, Stack, Title } from '@mantine/core';
import { PiReceipt, PiUsers, PiTruck, PiHandshake, PiPause, PiTimer } from 'react-icons/pi';

import classes from './stat-card-list.module.css';
import StatCard from '../stat-card/stat-card';

const generalStats = [
  {
    title: 'לקוחות',
    subtitle: 'כל הלקוחות',
    icon: <PiUsers className={classes.icon} />,
    value: 0,
  },
  {
    title: 'הזמנות',
    subtitle: 'כל ההזמנות',
    icon: <PiReceipt className={classes.icon} />,
    value: 0,
  },
] as const;

const orderStats = [
  { title: 'ממתין ל', icon: <PiPause className={classes.icon} />, value: 0 },
  { title: 'מעבד', icon: <PiTimer className={classes.icon} />, value: 0 },
  { title: 'נשלח', icon: <PiTruck className={classes.icon} />, value: 0 },
  { title: 'נמסר', icon: <PiHandshake className={classes.icon} />, value: 0 },
] as const;

export interface StatCardListProps {}

export default function StatCardList() {
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
