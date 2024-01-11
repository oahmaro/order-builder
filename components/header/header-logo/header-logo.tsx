import { Anchor, Box, Group } from '@mantine/core';
import Link from 'next/link';

import classes from './header-logo.module.css';

interface HeaderLogoProps {
  onClick?(): void;
}

export default function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <Anchor component={Link} href="/" underline="never" onClick={onClick}>
      <Group gap={12} w={200}>
        <Box className={classes.logo} />
        <Box fw={600}>אמנות</Box>
      </Group>
    </Anchor>
  );
}
