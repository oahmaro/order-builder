import { ReactNode, forwardRef } from 'react';
import { Box, Group, NumberFormatter, Paper, Text } from '@mantine/core';

import classes from './stat-card.module.css';

export interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: ReactNode;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value = '—', subtitle, icon }, ref) => (
    <Paper key={title} ref={ref} className={classes.card}>
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {title}
        </Text>

        {icon || <Box w={16} h={16} />}
      </Group>

      <Box className={classes.value}>
        <NumberFormatter value={value} thousandSeparator />
      </Box>

      {subtitle && (
        <Text fz="xs" c="dimmed" mt={8} w="fit-content">
          {subtitle}
        </Text>
      )}
    </Paper>
  )
);

StatCard.displayName = 'StatCard';

export default StatCard;
