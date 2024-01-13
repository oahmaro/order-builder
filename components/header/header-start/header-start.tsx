'use client';

import { ActionIcon, Button, Drawer, Group, Stack } from '@mantine/core';
import { IoIosMenu } from 'react-icons/io';

import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { HeaderLogo } from '../header-logo';

export default function HeaderStart() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon size={32} variant="default" onClick={open}>
          <IoIosMenu />
        </ActionIcon>

        <HeaderLogo />
      </Group>

      <Drawer.Root opened={opened} onClose={close} offset={2} radius="lg" size="xs">
        <Drawer.Overlay color="#000" backgroundOpacity={0.1} />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title>
              <HeaderLogo onClick={close} />
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <Stack gap={0}>
              <Button
                component={Link}
                variant="subtle"
                color="gray"
                c="dark"
                fullWidth
                justify="flex-start"
                href="/orders?page=1&pageSize=10&sort=id:ASC"
                onClick={close}
              >
                הזמנות
              </Button>

              <Button
                component={Link}
                variant="subtle"
                color="gray"
                c="dark"
                fullWidth
                justify="flex-start"
                href="/customers?page=1&pageSize=10&sort=name:ASC"
                onClick={close}
              >
                לקוחות
              </Button>
            </Stack>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
    </>
  );
}
