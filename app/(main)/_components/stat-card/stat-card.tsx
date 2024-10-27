import Link from 'next/link';
import { ReactNode, forwardRef } from 'react';
import { Anchor, Box, Group, NumberFormatter, Paper, Text } from '@mantine/core';

import classes from './stat-card.module.css';
import { statCardContent, StatCardPhrases } from './stat-card.content';

export interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon?: ReactNode;
  href?: string;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value = '—', subtitle, icon, href }, ref) => (
    <Paper key={title} ref={ref} className={classes.card}>
      <Group justify="space-between">
        <Group>
          <Text size="xs" c="dimmed" className={classes.title}>
            {title}
          </Text>

          {href && (
            <Anchor size="sm" component={Link} href={href} underline="always" fw="bold">
              {statCardContent.t(StatCardPhrases.VIEW_ALL)}{' '}
            </Anchor>
          )}
        </Group>

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
