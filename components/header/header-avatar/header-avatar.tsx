'use client';

import { useTransition } from 'react';

import { Avatar, Box, Group, Menu } from '@mantine/core';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import classes from './header-avatar.module.css';

interface HeaderAvatarProps {
  initials?: string;
}

export default function HeaderAvatar({ initials }: HeaderAvatarProps) {
  const [, startTransition] = useTransition();

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
          <Menu.Item component={Link} href="/profile">
            פרופיל
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            onClick={() =>
              startTransition(async () => {
                await signOut();
              })
            }
          >
            להתנתק
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
