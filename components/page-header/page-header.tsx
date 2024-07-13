import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Anchor, Button, Group, Text, Title } from '@mantine/core';

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
  backPath?: string;
  isLoading?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  action,
  backPath,
  isLoading,
}: PageHeaderProps) {
  if (isLoading) {
    return <PageHeaderLoading />;
  }

  return (
    <div className={classes.root}>
      {backPath && (
        <Anchor component={Link} href={backPath} fw="bold">
          <Group gap={2}>
            <IconChevronRight />
            <Text fw="bold" fz="lg">
              חזור
            </Text>
          </Group>
        </Anchor>
      )}

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
