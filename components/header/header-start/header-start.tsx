'use client';

import { ActionIcon, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoIosMenu } from 'react-icons/io';
import { Session } from 'next-auth';

import { HeaderLogo } from '../header-logo';
import { MainDrawer } from '@/components/main-drawer';

interface HeaderStartProps {
  session?: Session | null;
}

export default function HeaderStart({ session }: HeaderStartProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Group>
        <ActionIcon size="lg" variant="default" onClick={open}>
          <IoIosMenu />
        </ActionIcon>

        <HeaderLogo />
      </Group>

      <MainDrawer opened={opened} onClose={close} session={session} />
    </>
  );
}
