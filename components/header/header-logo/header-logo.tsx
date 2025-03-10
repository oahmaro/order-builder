import { Anchor, Group, Image } from '@mantine/core';

import { Link } from '@/components';
import classes from './header-logo.module.css';

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
        <Image src="/logo-column.jpeg" alt="Logo" height={60} width="auto" fit="contain" />
        {/* <Box fw={600}>{headerLogoContent.t(HeaderLogoPhrases.TITLE)}</Box> */}
      </Group>
    </Anchor>
  );
}
