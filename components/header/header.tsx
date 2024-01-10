import { forwardRef } from 'react';
import { Anchor, Avatar, Box, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './header.module.css';

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    <Anchor component={Link} href="/" underline="never">
      <Group gap={8} w={200}>
        <Box className={classes.logo} />
        <Box fz="lg" fw={600}>
          אמנות
        </Box>
      </Group>
    </Anchor>

    <Group component="nav" flex={1} justify="center">
      <Button component={Link} href="/orders" variant="subtle" color="gray" c="dark">
        הזמנות
      </Button>

      <Button component={Link} href="/customers" variant="subtle" color="gray" c="dark">
        לקוחות
      </Button>
    </Group>

    <Group w={200} justify="flex-end">
      <Avatar size={32} />
    </Group>
  </div>
));

Header.displayName = 'Header';

export default Header;
