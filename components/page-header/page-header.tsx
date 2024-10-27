import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { Anchor, Button, Group, Text, Title, Tooltip } from '@mantine/core';

import PageHeaderLoading from './page-header-loading';
import { pageHeaderContent, PageHeaderPhrases } from './page-header.content';

interface Action {
  label: string;
  link?: string;
  onClick?(): void;
  disabled?: boolean;
  tooltipLabel?: string;
  color?: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
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
    <div>
      {backPath && (
        <Anchor
          component={Link}
          href={backPath}
          style={{ display: 'block', width: 'fit-content' }}
          fw="bold"
        >
          <Group gap={2} pe="xl">
            <IconChevronRight />
            <Text fw="bold" fz="lg">
              {pageHeaderContent.t(PageHeaderPhrases.BACK)}
            </Text>
          </Group>
        </Anchor>
      )}

      <Group justify="space-between" align="flex-start">
        {title && <Title order={1}>{title}</Title>}

        <Group>
          {actions &&
            actions.map((action, index) => (
              <Tooltip key={index} label={action.tooltipLabel} disabled={!action.tooltipLabel}>
                <Button
                  type={action.type || 'button'}
                  {...(action.link ? { component: Link, href: action.link } : { href: '' })}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  color={action.color}
                  variant={action.variant}
                >
                  {action.label}
                </Button>
              </Tooltip>
            ))}
        </Group>
      </Group>

      {subtitle && <Text c="dimmed">{subtitle}</Text>}
    </div>
  );
}
