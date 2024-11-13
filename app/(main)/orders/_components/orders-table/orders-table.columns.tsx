'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Badge, NumberFormatter } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';
import { Order, OrderStatus, OrderItem } from '@prisma/client';

import { generateUserTitle, getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

type OrderDataType = Partial<Order> & {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  };
  orderItems: OrderItem[];
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<OrderDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: ordersTableContent.t(OrdersTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('customer', {
    header: ordersTableContent.t(OrdersTableContentPhrases.CUSTOMER),
    cell: (info) => (
      <Link
        href={`/customers/${info.getValue().id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {`${info.getValue().firstName} ${info.getValue().lastName}`}
      </Link>
    ),
  }),

  columnHelper.accessor('amountPaid', {
    header: ordersTableContent.t(OrdersTableContentPhrases.AMOUNT_PAID),
    cell: (info) => <NumberFormatter prefix="₪" value={info.getValue() || 0} thousandSeparator />,
  }),

  columnHelper.accessor('status', {
    header: ordersTableContent.t(OrdersTableContentPhrases.STATUS),
    cell: (info) => (
      <Badge color={getOrderStatusMapping(info.getValue() as OrderStatus).color}>
        {getOrderStatusMapping(info.getValue() as OrderStatus).label}
      </Badge>
    ),
  }),

  columnHelper.accessor('orderItems', {
    header: ordersTableContent.t(OrdersTableContentPhrases.ITEMS_COUNT),
    cell: (info) => info.getValue()?.length || 0,
  }),

  columnHelper.accessor('createdAt', {
    header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('DD/MM/YYYY HH:mm'),
  }),

  columnHelper.accessor('createdByUser', {
    header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedByUser', {
    header: ordersTableContent.t(OrdersTableContentPhrases.UPDATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedAt', {
    header: ordersTableContent.t(OrdersTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('DD/MM/YYYY HH:mm'),
  }),
];
