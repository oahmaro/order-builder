import { Button, Group } from '@mantine/core';
import Link from 'next/link';

export default function HeaderNav() {
  return (
    <Group component="nav" flex={1} justify="center">
      <Button
        component={Link}
        href="/orders?page=1&pageSize=10&sort=id:ASC"
        variant="subtle"
        color="gray"
        c="dark"
      >
        הזמנות
      </Button>

      <Button
        component={Link}
        href="/customers?page=1&pageSize=10&sort=name:ASC"
        variant="subtle"
        color="gray"
        c="dark"
      >
        לקוחות
      </Button>
    </Group>
  );
}
