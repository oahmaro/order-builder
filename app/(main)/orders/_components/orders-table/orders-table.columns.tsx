'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor, Badge, NumberFormatter } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';
import { Order, OrderStatus, OrderItem } from '@prisma/client';

import { generateUserTitle, getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

export type OrderDataType = Partial<Order> & {
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
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: ordersTableContent.t(OrdersTableContentPhrases.ID),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/orders/${info.row.original.id}`}>
        {`ORD-${info.getValue()}`}
      </Anchor>
    ),
  }),

  columnHelper.accessor((row) => `${row.customer.firstName} ${row.customer.lastName}`, {
    id: 'customerName',
    header: ordersTableContent.t(OrdersTableContentPhrases.CUSTOMER),
    cell: (info) => (
      <Anchor component={Link} size="sm" href={`/customers/${info.row.original.customer.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor('amountPaid', {
    header: ordersTableContent.t(OrdersTableContentPhrases.AMOUNT_PAID),
    cell: (info) => <NumberFormatter prefix="₪" value={info.getValue() || 0} thousandSeparator />,
  }),

  columnHelper.accessor(
    (row) => {
      const statusMapping = getOrderStatusMapping(row.status as OrderStatus);
      // Return both English and Hebrew values for searching
      return `${row.status} ${statusMapping.label}`;
    },
    {
      id: 'status',
      header: ordersTableContent.t(OrdersTableContentPhrases.STATUS),
      cell: (info) => (
        <Badge color={getOrderStatusMapping(info.row.original.status as OrderStatus).color}>
          {getOrderStatusMapping(info.row.original.status as OrderStatus).label}
        </Badge>
      ),
    }
  ),

  columnHelper.accessor((row) => row.orderItems.length, {
    id: 'itemsCount',
    header: ordersTableContent.t(OrdersTableContentPhrases.ITEMS_COUNT),
  }),

  columnHelper.accessor((row) => (row.createdByUser ? generateUserTitle(row.createdByUser) : '-'), {
    id: 'createdBy',
    header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_BY),
    cell: (info) => {
      const user = info.row.original.createdByUser;
      return user ? (
        <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
          {info.getValue()}
        </Anchor>
      ) : (
        '-'
      );
    },
  }),

  columnHelper.accessor((row) => (row.updatedByUser ? generateUserTitle(row.updatedByUser) : '-'), {
    id: 'updatedBy',
    header: ordersTableContent.t(OrdersTableContentPhrases.UPDATED_BY),
    cell: (info) => {
      const user = info.row.original.updatedByUser;
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {info.getValue()}
        </Link>
      ) : (
        '-'
      );
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}`
        : '',
    {
      id: 'createdAt',
      header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt &&
        dayjs(info.row.original.createdAt).format('DD/MM/YYYY HH:mm'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm')}`
        : '',
    {
      id: 'updatedAt',
      header: ordersTableContent.t(OrdersTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.row.original.updatedAt &&
        dayjs(info.row.original.updatedAt).format('DD/MM/YYYY HH:mm'),
    }
  ),
];
