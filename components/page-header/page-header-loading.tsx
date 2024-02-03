import { Group, Skeleton } from '@mantine/core';

export default function PageHeaderLoading() {
  return (
    <Group h={69} justify="space-between">
      <Skeleton h={32} w={100} />
      <Skeleton h={32} w={112} />
    </Group>
  );
}
