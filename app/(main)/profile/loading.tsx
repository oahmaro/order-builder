import { Card, Group, Skeleton, Stack } from '@mantine/core';

export default function LoadingPage() {
  return (
    <Stack gap="lg">
      <Group h={42} justify="space-between" align="center">
        <Skeleton h={32} w={172} />
        <Skeleton h={32} w={84} />
      </Group>

      <Stack>
        <Card h={220} />
        <Card h={220} />
      </Stack>
    </Stack>
  );
}
