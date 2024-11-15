'use client';

import Link from 'next/link';
import { PiCalendar } from 'react-icons/pi';
import { LineChart } from '@mantine/charts';
import { DatePickerInput } from '@mantine/dates';
import { ReactNode, forwardRef, useState } from 'react';
import { Anchor, Box, Group, NumberFormatter, Paper, Text } from '@mantine/core';

import classes from './stat-card.module.css';
import { statCardContent, StatCardPhrases } from './stat-card.content';

export interface StatChartData {
  date: string;
  value: number;
}

export interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
  chartData?: StatChartData[];
  onDateRangeChange?: (range: [Date | null, Date | null]) => void;
  defaultExpanded?: boolean;
  metricName?: string;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value = '—',
      subtitle,
      icon,
      href,
      chartData,
      onDateRangeChange,
      defaultExpanded = true,
      metricName,
    },
    ref
  ) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(),
    ]);
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const handleDateRangeChange = (range: [Date | null, Date | null]) => {
      setDateRange(range);
      onDateRangeChange?.(range);
    };

    return (
      <Paper key={title} ref={ref} className={classes.card}>
        <Group justify="space-between">
          <Group>
            <Text size="xs" c="dimmed" className={classes.title}>
              {title}
            </Text>

            {href && (
              <Anchor size="sm" component={Link} href={href} underline="always" fw="bold">
                {statCardContent.t(StatCardPhrases.VIEW_ALL)}
              </Anchor>
            )}
          </Group>

          <Group>
            {chartData && (
              <Anchor
                component="button"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                underline="always"
              >
                {isExpanded
                  ? statCardContent.t(StatCardPhrases.HIDE_STATS)
                  : statCardContent.t(StatCardPhrases.SHOW_STATS)}
              </Anchor>
            )}
            {icon || <Box w={16} h={16} />}
          </Group>
        </Group>

        <Box className={classes.value}>
          <NumberFormatter value={value} thousandSeparator />
        </Box>

        {subtitle && (
          <Text fz="xs" c="dimmed" mt={8} w="fit-content">
            {subtitle}
          </Text>
        )}

        {chartData && isExpanded && (
          <>
            <DatePickerInput
              mt="md"
              size="xs"
              type="range"
              w="fit-content"
              clearable={false}
              value={dateRange}
              onChange={handleDateRangeChange}
              valueFormat="DD/MM/YYYY"
              leftSection={<PiCalendar className={classes.icon} />}
            />

            <LineChart
              h={140}
              mt="md"
              data={chartData}
              dataKey="date"
              series={[{ name: metricName || 'value', color: 'indigo.6' }]}
              curveType="monotone"
              withTooltip
              tickLine="y"
            />
          </>
        )}
      </Paper>
    );
  }
);

StatCard.displayName = 'StatCard';

export default StatCard;
