'use client';

import { useEffect, useTransition } from 'react';
import { Avatar, Box, Group, Menu, rem } from '@mantine/core';
import { nprogress } from '@mantine/nprogress';
import { signOut } from 'next-auth/react';
import { PiUser } from 'react-icons/pi';
import { FiLogOut } from 'react-icons/fi';

import classes from './header-avatar.module.css';
import { Link } from '@/components';

interface HeaderAvatarProps {
  initials?: string;
}

export default function HeaderAvatar({ initials }: HeaderAvatarProps) {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      nprogress.start();
      return;
    }

    if (!isPending) {
      nprogress.complete();
    }
  }, [isPending]);

  return (
    <Group w={200} justify="flex-end">
      <Menu shadow="md" width={140} position="bottom-end">
        <Menu.Target>
          <Box className={classes.avatarWrapper}>
            <Avatar className={classes.avatar} color="black" variant="filled">
              {initials}
            </Avatar>
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component={Link}
            href="/profile"
            rightSection={<PiUser style={{ width: rem(16), height: rem(16) }} />}
          >
            פרופיל
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            onClick={() =>
              startTransition(async () => {
                await signOut();
              })
            }
            rightSection={<FiLogOut style={{ width: rem(16), height: rem(16) }} />}
          >
            להתנתק
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
