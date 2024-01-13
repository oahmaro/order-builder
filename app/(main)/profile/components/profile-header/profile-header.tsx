import { Button, Group, Title } from '@mantine/core';

export default function ProfileHeader() {
  return (
    <Group w="100%" justify="space-between">
      <Title order={1} size="h2">
        Osama Ahmaro
      </Title>

      <Button size="md" disabled>
        להציל
      </Button>
    </Group>
  );
}
