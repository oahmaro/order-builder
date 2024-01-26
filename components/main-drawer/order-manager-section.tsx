import { Button, rem } from '@mantine/core';
import Link from 'next/link';
import { PiHouse, PiReceipt, PiUsers, PiSticker, PiImages, PiFrameCorners } from 'react-icons/pi';
import { LiaImages } from 'react-icons/lia';

const menus = [
  {
    label: 'דף הבית',
    value: 'home',
    url: '/',
    icon: <PiHouse style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'הזמנות',
    value: 'orders',
    url: '/orders?page=1&pageSize=10&sort=id:ASC',
    icon: <PiReceipt style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'לקוחות',
    value: 'customers',
    url: '/customers?page=1&pageSize=10&sort=name:ASC',
    icon: <PiUsers style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'מסגרות',
    value: 'frames',
    url: '/frames?page=1&pageSize=10&sort=code:ASC',
    icon: <LiaImages style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'הידבקויות',
    value: 'adhesions',
    url: '/adhesions?page=1&pageSize=10&sort=name:ASC',
    icon: <PiSticker style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'הדפסים',
    value: 'prints',
    url: '/prints?page=1&pageSize=10&sort=name:ASC',
    icon: <PiImages style={{ width: rem(16), height: rem(16) }} />,
  },
  {
    label: 'תיאורים',
    value: 'descriptions',
    url: '/descriptions?page=1&pageSize=10&sort=name:ASC',
    icon: <PiFrameCorners style={{ width: rem(16), height: rem(16) }} />,
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
