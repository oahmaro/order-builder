import Image from 'next/image';
import { ReactNode } from 'react';
import { Stack, Text } from '@mantine/core';

export interface MainTableEmptyStateProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function MainTableEmptyState({
  title,
  description,
  children,
}: MainTableEmptyStateProps) {
  return (
    <Stack justify="center" align="center">
      <Stack align="center" justify="center" p={24}>
        <Image src="/empty.svg" width={240} height={120} alt="Empty results" />

        <Stack align="center" justify="center" gap={0} maw={320} ta="center">
          <Text fw={600} fz="xl" c="gray.7">
            {title}
          </Text>

          {description && <Text c="dimmed">{description}</Text>}
        </Stack>

        {children}
      </Stack>
    </Stack>
  );
}
