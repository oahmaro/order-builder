import { Button, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';

import classes from './page-header.module.css';
import PageHeaderLoading from './page-header-loading';

interface Action {
  label: string;
  link?: string;
  onClick?(): void;
}

export interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  action?: Action;
  isLoading?: boolean;
}

export default function PageHeader({ title, subtitle, action, isLoading }: PageHeaderProps) {
  if (isLoading) {
    return <PageHeaderLoading />;
  }

  return (
    <div className={classes.root}>
      <Group justify="space-between" align="flex-start">
        {title && <Title order={1}>{title}</Title>}

        {action && (
          <Button
            {...(action?.link ? { component: Link, href: action.link! } : { href: '' })}
            onClick={action?.onClick}
          >
            {action.label}
          </Button>
        )}
      </Group>

      {subtitle && <Text c="dimmed">{subtitle}</Text>}
    </div>
  );
}
