'use client';

import { ActionIcon, Group } from '@mantine/core';
import { IoIosMenu } from 'react-icons/io';

import { useDisclosure } from '@mantine/hooks';
import { HeaderLogo } from '../header-logo';
import { MainDrawer } from '@/components/main-drawer';

export default function HeaderStart() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon size="lg" variant="default" onClick={open}>
          <IoIosMenu />
        </ActionIcon>

        <HeaderLogo />
      </Group>

      <MainDrawer opened={opened} onClose={close} />
    </>
  );
}
