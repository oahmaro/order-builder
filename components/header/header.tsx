import { forwardRef } from 'react';
import { Avatar, Box, Breadcrumbs, Button, Group } from '@mantine/core';
import Link from 'next/link';
import classes from './header.module.css';

const items = [
  { title: 'אמנות', href: '/' },
  { title: 'הזמנות', href: '/orders' },
].map((item, index) => (
  <Button
    size="compact-md"
    className={classes.breadcrumbItem}
    color="gray"
    c="dark"
    component={Link}
    variant="subtle"
    href={item.href}
    key={index}
  >
    {item.title}
  </Button>
));

export interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => (
  <div ref={ref} className={classes.root}>
    <Group>
      <Box className={classes.logo} />
      <Breadcrumbs styles={{ separator: { color: 'var(--mantine-color-gray-5)' } }}>
        {items}
      </Breadcrumbs>
    </Group>

    <Avatar />
  </div>
));

Header.displayName = 'Header';

export default Header;
