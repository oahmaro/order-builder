import { Card, Group, Skeleton, Stack } from '@mantine/core';

export interface TableLoadingProps {}

export default function TableLoading() {
  return (
    <Stack gap={40}>
      <Group h={69} justify="space-between">
        <Skeleton h={32} w={100} />
        <Skeleton h={32} w={112} />
      </Group>

      <Card h={349} />
    </Stack>
  );
}
