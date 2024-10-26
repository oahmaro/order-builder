import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Anchor, Button, Group, Text, Title } from '@mantine/core';

import classes from './page-header.module.css';
import PageHeaderLoading from './page-header-loading';

interface Action {
  label: string;
  link?: string;
  onClick?(): void;
  disabled?: boolean;
}

export interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: Action[];
  backPath?: string;
  isLoading?: boolean;
}

export default function PageHeader({
  title,
  subtitle,
  actions,
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

        {actions && (
          <Button
            type="submit"
            {...(actions[0]?.link ? { component: Link, href: actions[0].link! } : { href: '' })}
            onClick={actions[0]?.onClick}
            disabled={actions[0]?.disabled}
          >
            {actions[0].label}
          </Button>
        )}
      </Group>

      {subtitle && <Text c="dimmed">{subtitle}</Text>}
    </div>
  );
}
