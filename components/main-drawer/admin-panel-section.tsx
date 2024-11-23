import { RiAdminLine } from 'react-icons/ri';
import { PiBuildings } from 'react-icons/pi';
import { Button, Divider, Group, Stack, Text, rem } from '@mantine/core';

import { Link } from '../link';
import { mainDrawerContent, MainDrawerPhrases } from './main-drawer.content';

const menus = [
  {
    label: mainDrawerContent.t(MainDrawerPhrases.USERS),
    value: 'users',
    url: '/users?page=1&pageSize=10&sortBy=firstName&sortDir=asc',
    icon: <RiAdminLine style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.COMPANY),
    value: 'company',
    url: '/company',
    icon: <PiBuildings style={{ width: rem(16), height: rem(16) }} />,
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
          {mainDrawerContent.t(MainDrawerPhrases.TITLE)}
        </Text>
      </Group>

      <Stack gap={0}>
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
