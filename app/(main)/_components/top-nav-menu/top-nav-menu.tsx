import { Group, Button, rem } from '@mantine/core';
import {
  PiReceipt,
  PiUsers,
  PiSticker,
  PiImages,
  PiFrameCorners,
  PiSquareHalf,
} from 'react-icons/pi';
import Link from 'next/link';
import { LiaImages } from 'react-icons/lia';

import classes from './top-nav-menu.module.css';
import { mainDrawerContent, MainDrawerPhrases } from '@/components/main-drawer/main-drawer.content';

const menus = [
  {
    label: mainDrawerContent.t(MainDrawerPhrases.ORDERS),
    value: 'orders',
    url: '/orders?page=1&pageSize=10&sort=id:ASC',
    icon: <PiReceipt style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.CUSTOMERS),
    value: 'customers',
    url: '/customers?page=1&pageSize=10&sort=name:ASC',
    icon: <PiUsers style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.FRAMES),
    value: 'frames',
    url: '/frames?page=1&pageSize=10&sort=code:ASC',
    icon: <LiaImages style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.ADHESIONS),
    value: 'adhesions',
    url: '/adhesions?page=1&pageSize=10&sort=name:ASC',
    icon: <PiSticker style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.PRINTS),
    value: 'prints',
    url: '/prints?page=1&pageSize=10&sort=name:ASC',
    icon: <PiImages style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.DESCRIPTIONS),
    value: 'descriptions',
    url: '/descriptions?page=1&pageSize=10&sort=name:ASC',
    icon: <PiFrameCorners style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: mainDrawerContent.t(MainDrawerPhrases.PASSEPARTOUT),
    value: 'passepartouts',
    url: '/passepartouts?page=1&pageSize=10&sort=name:ASC',
    icon: <PiSquareHalf style={{ width: rem(16), height: rem(16) }} />,
  },
];

export default function TopNavMenu() {
  return (
    <Group gap="xs" className={classes.root}>
      {menus.map((menu) => (
        <Button
          flex={1}
          size="sm"
          color="gray"
          href={menu.url}
          variant="subtle"
          key={menu.value}
          component={Link}
          leftSection={menu.icon}
          className={classes.button}
        >
          {menu.label}
        </Button>
      ))}
    </Group>
  );
}
