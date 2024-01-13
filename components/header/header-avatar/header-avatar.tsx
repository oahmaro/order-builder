'use client';

import { Avatar, Box, Group, Menu } from '@mantine/core';
import Link from 'next/link';
import classes from './header-avatar.module.css';

export default function HeaderAvatar() {
  return (
    <Group w={200} justify="flex-end">
      <Menu shadow="md" width={140} position="bottom-end">
        <Menu.Target>
          <Box className={classes.avatarWrapper}>
            <Avatar className={classes.avatar} color="black" variant="filled">
              OA
            </Avatar>
          </Box>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component={Link} href="/profile">
            פרופיל
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>להתנתק</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
