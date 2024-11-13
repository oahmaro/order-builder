'use client';

import { PiUser } from 'react-icons/pi';
import { signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import { nprogress } from '@mantine/nprogress';
import { useEffect, useTransition } from 'react';
import { Avatar, Box, Group, Menu, Stack, Text, rem } from '@mantine/core';

import { Link } from '@/components';
import classes from './header-avatar.module.css';
import { headerAvatarContent, HeaderAvatarPhrases } from './header-avatar.content';

interface HeaderAvatarProps {
  title?: string;
  subtitle?: string;
  initials?: string;
}

export default function HeaderAvatar({ initials, title, subtitle }: HeaderAvatarProps) {
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
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Box className={classes.avatarWrapper}>
            <Avatar className={classes.avatar} color="black" variant="filled">
              {initials}
            </Avatar>
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          {(title || subtitle) && (
            <>
              <Menu.Label>
                <Stack gap={0}>
                  <Text size="sm" fw="bold" c="dark" truncate="start">
                    {title}
                  </Text>
                  {subtitle && (
                    <Text size="sm" c="dimmed" truncate="start">
                      {subtitle}
                    </Text>
                  )}
                </Stack>
              </Menu.Label>
              <Menu.Divider />
            </>
          )}

          <Menu.Item
            component={Link}
            href="/profile"
            rightSection={<PiUser style={{ width: rem(16), height: rem(16) }} />}
          >
            {headerAvatarContent.t(HeaderAvatarPhrases.PROFILE)}
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            color="red"
            onClick={() =>
              startTransition(async () => {
                await signOut({ callbackUrl: '/login' });
              })
            }
            rightSection={<FiLogOut style={{ width: rem(16), height: rem(16) }} />}
          >
            {headerAvatarContent.t(HeaderAvatarPhrases.LOGOUT)}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
