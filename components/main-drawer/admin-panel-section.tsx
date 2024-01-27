import { Button, Divider, Group, Stack, Text, rem } from '@mantine/core';
import { RiAdminLine } from 'react-icons/ri';

import { Link } from '../link';

const menus = [
  {
    label: 'משתמשים',
    value: 'users',
    url: '/users?page=1&pageSize=10&sort=firstName:ASC',
    icon: <RiAdminLine style={{ width: rem(16), height: rem(16) }} />,
  },
];

interface AdminPanelSectionProps {
  onClose?(): void;
}

export default function AdminPanelSection({ onClose }: AdminPanelSectionProps) {
  return (
    <>
      <Divider my={8} />

      <Group justify="space-between" pr={16}>
        <Text size="xs" fw={500} c="dimmed">
          פאנל הניהול
        </Text>
      </Group>

      <Stack>
        {menus.map((menu) => (
          <Button
            key={menu.value}
            component={Link}
            href={menu.url}
            variant="subtle"
            color="gray"
            c="dark"
            fullWidth
            justify="flex-start"
            onClick={onClose}
            leftSection={menu.icon}
          >
            {menu.label}
          </Button>
        ))}
      </Stack>
    </>
  );
}
