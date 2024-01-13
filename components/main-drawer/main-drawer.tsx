import { Button, Drawer, Stack } from '@mantine/core';
import Link from 'next/link';
import { HeaderLogo } from '../header/header-logo';

export interface MainDrawerProps {
  opened: boolean;
  onClose(): void;
}

const menus = [
  { label: 'הזמנות', value: 'orders', url: '/orders?page=1&pageSize=10&sort=id:ASC' },
  { label: 'לקוחות', value: 'customers', url: '/customers?page=1&pageSize=10&sort=name:ASC' },
  { label: 'מסגרות', value: 'frames', url: '/frames?page=1&pageSize=10&sort=code:ASC' },
  { label: 'הידבקויות', value: 'adhesions', url: '/adhesions?page=1&pageSize=10&sort=name:ASC' },
  { label: 'הדפסים', value: 'prints', url: '/prints?page=1&pageSize=10&sort=name:ASC' },
  {
    label: 'תיאורים',
    value: 'descriptions',
    url: '/descriptions?page=1&pageSize=10&sort=name:ASC',
  },
];

export default function MainDrawer({ opened, onClose }: MainDrawerProps) {
  return (
    <Drawer.Root opened={opened} onClose={onClose} offset={2} radius="lg" size="xs">
      <Drawer.Overlay color="#000" backgroundOpacity={0.1} />

      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            <HeaderLogo onClick={onClose} />
          </Drawer.Title>
          <Drawer.CloseButton />
        </Drawer.Header>
        <Drawer.Body>
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
              >
                {menu.label}
              </Button>
            ))}
          </Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
