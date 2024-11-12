import { Button, rem } from '@mantine/core';
import { LiaImages } from 'react-icons/lia';

import {
  PiHouse,
  PiReceipt,
  PiUsers,
  PiSticker,
  PiImages,
  PiFrameCorners,
  PiSquareHalf,
} from 'react-icons/pi';

import { Link } from '../link';
import { mainDrawerContent, MainDrawerPhrases } from './main-drawer.content';

const menus = [
  {
    label: mainDrawerContent.t(MainDrawerPhrases.HOME),
    value: 'home',
    url: '/',
    icon: <PiHouse style={{ width: rem(16), height: rem(16) }} />,
  },
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

interface MainDrawerOrderManagerSectionProps {
  onClose?(): void;
}

export default function OrderManagerSection({ onClose }: MainDrawerOrderManagerSectionProps) {
  return (
    <>
      {menus.map((menu) => (
        <Button
          leftSection={menu.icon}
          key={menu.value}
          component={Link}
          href={menu.url}
          variant="subtle"
          color="gray"
          c="dark"
          fullWidth
          justify="flex-start"
          onClick={onClose}
        >
          {menu.label}
        </Button>
      ))}
    </>
  );
}
