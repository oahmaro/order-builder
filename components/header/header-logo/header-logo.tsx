import { Anchor, Box, Group } from '@mantine/core';

import { Link } from '@/components';
import classes from './header-logo.module.css';
import { headerLogoContent, HeaderLogoPhrases } from './header-logo.content';

interface HeaderLogoProps {
  onClick?(): void;
}

export default function HeaderLogo({ onClick }: HeaderLogoProps) {
  return (
    <Anchor
      className={classes.wrapper}
      component={Link}
      href="/"
      underline="never"
      onClick={onClick}
    >
      <Group gap={12} px="xs">
        <Box className={classes.logo} />
        <Box fw={600}>{headerLogoContent.t(HeaderLogoPhrases.TITLE)}</Box>
      </Group>
    </Anchor>
  );
}
