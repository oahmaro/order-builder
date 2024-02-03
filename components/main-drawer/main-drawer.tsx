'use client';

import { Drawer, Stack } from '@mantine/core';
import { User } from 'next-auth';
import { UserRole } from '@prisma/client';

import { HeaderLogo } from '../header/header-logo';
import OrderManagerSection from './order-manager-section';
import AdminPanelSection from './admin-panel-section';

export interface MainDrawerProps {
  opened: boolean;
  user?: User | null;
  onClose(): void;
}

export default function MainDrawer({ opened, user, onClose }: MainDrawerProps) {
  return (
    <Drawer.Root opened={opened} onClose={onClose} offset={6} radius="lg" size="xs">
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
            <OrderManagerSection onClose={onClose} />
            {user?.role === UserRole.ADMIN && <AdminPanelSection onClose={onClose} />}
          </Stack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
