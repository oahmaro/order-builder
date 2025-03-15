'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor, Badge, NumberFormatter, Tooltip, Highlight } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';
import { Order, OrderStatus, OrderItem } from '@prisma/client';

import { generateUserTitle, getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

export type OrderDataType = Partial<Order> & {
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    phones?: {
      id: number;
      number: string;
      isPrimary: boolean;
    }[];
  };
  orderItems: OrderItem[];
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<OrderDataType>();

const CellWrapper = ({
  children,
  isCanceled,
}: {
  children: React.ReactNode;
  isCanceled: boolean;
}) => {
  if (isCanceled) {
    return (
      <span
        style={{
          textDecoration: 'line-through',
          opacity: 0.4,
        }}
      >
        {children}
      </span>
    );
  }
  return <>{children}</>;
};

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: ordersTableContent.t(OrdersTableContentPhrases.ID),
    cell: (info) => {
      const isCanceled = info.row.original.status === OrderStatus.CANCELED;
      const orderIdText = `${info.getValue()}`;
      const searchQuery = info.table.getState().globalFilter || '';

      if (isCanceled) {
        return (
          <CellWrapper isCanceled={isCanceled}>
            <Tooltip label={ordersTableContent.t(OrdersTableContentPhrases.CANCELED_ORDER_TOOLTIP)}>
              <span style={{ cursor: 'not-allowed' }}>
                {searchQuery ? (
                  <Highlight highlight={searchQuery}>{orderIdText}</Highlight>
                ) : (
                  orderIdText
                )}
              </span>
            </Tooltip>
          </CellWrapper>
        );
      }

      return (
        <CellWrapper isCanceled={isCanceled}>
          <Anchor size="sm" component={Link} href={`/orders/${info.row.original.id}`}>
            {searchQuery ? (
              <Highlight highlight={searchQuery}>{orderIdText}</Highlight>
            ) : (
              orderIdText
            )}
          </Anchor>
        </CellWrapper>
      );
    },
  }),

  columnHelper.accessor((row) => `${row.customer.firstName} ${row.customer.lastName}`, {
    id: 'customerName',
    header: ordersTableContent.t(OrdersTableContentPhrases.CUSTOMER),
    cell: (info) => {
      const isCanceled = info.row.original.status === OrderStatus.CANCELED;
      const customerName = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <CellWrapper isCanceled={isCanceled}>
          <Anchor component={Link} size="sm" href={`/customers/${info.row.original.customer.id}`}>
            {searchQuery ? (
              <Highlight highlight={searchQuery}>{customerName}</Highlight>
            ) : (
              customerName
            )}
          </Anchor>
        </CellWrapper>
      );
    },
  }),

  columnHelper.accessor(
    (row) => {
      const primaryPhone = row.customer.phones?.find((phone) => phone.isPrimary)?.number;
      return primaryPhone || row.customer.phones?.[0]?.number || '';
    },
    {
      id: 'customerPhone',
      header: ordersTableContent.t(OrdersTableContentPhrases.CUSTOMER_PHONE) || 'Phone',
      cell: (info) => {
        const isCanceled = info.row.original.status === OrderStatus.CANCELED;
        const phoneNumber = info.getValue();
        const searchQuery = info.table.getState().globalFilter || '';

        return (
          <CellWrapper isCanceled={isCanceled}>
            {phoneNumber ? (
              searchQuery ? (
                <Highlight fz="sm" highlight={searchQuery}>
                  {phoneNumber}
                </Highlight>
              ) : (
                phoneNumber
              )
            ) : (
              '-'
            )}
          </CellWrapper>
        );
      },
    }
  ),

  columnHelper.accessor('amountPaid', {
    header: ordersTableContent.t(OrdersTableContentPhrases.AMOUNT_PAID),
    cell: (info) => {
      const isCanceled = info.row.original.status === OrderStatus.CANCELED;

      return (
        <CellWrapper isCanceled={isCanceled}>
          <NumberFormatter prefix="₪" value={info.getValue() || 0} thousandSeparator />
        </CellWrapper>
      );
    },
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
        <Badge
          variant="light"
          color={getOrderStatusMapping(info.row.original.status as OrderStatus).color}
        >
          {getOrderStatusMapping(info.row.original.status as OrderStatus).label}
        </Badge>
      ),
    }
  ),

  columnHelper.accessor((row) => row.orderItems.length, {
    id: 'itemsCount',
    header: ordersTableContent.t(OrdersTableContentPhrases.ITEMS_COUNT),
    cell: (info) => {
      const isCanceled = info.row.original.status === OrderStatus.CANCELED;
      return <CellWrapper isCanceled={isCanceled}>{info.getValue()}</CellWrapper>;
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdByUser ? `${row.createdByUser.id} ${generateUserTitle(row.createdByUser)}` : '-',
    {
      id: 'createdBy',
      header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_BY),
      cell: (info) => {
        const isCanceled = info.row.original.status === OrderStatus.CANCELED;
        const user = info.row.original.createdByUser;

        return (
          <CellWrapper isCanceled={isCanceled}>
            {user ? (
              <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
                {generateUserTitle(user)}
              </Anchor>
            ) : (
              '-'
            )}
          </CellWrapper>
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedByUser ? `${row.updatedByUser.id} ${generateUserTitle(row.updatedByUser)}` : '-',
    {
      id: 'updatedBy',
      header: ordersTableContent.t(OrdersTableContentPhrases.UPDATED_BY),
      cell: (info) => {
        const isCanceled = info.row.original.status === OrderStatus.CANCELED;
        const user = info.row.original.updatedByUser;

        return (
          <CellWrapper isCanceled={isCanceled}>
            {user ? (
              <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {info.getValue()}
              </Link>
            ) : (
              '-'
            )}
          </CellWrapper>
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}`
        : '',
    {
      id: 'createdAt',
      header: ordersTableContent.t(OrdersTableContentPhrases.CREATED_AT),
      cell: (info) => {
        const isCanceled = info.row.original.status === OrderStatus.CANCELED;
        return (
          <CellWrapper isCanceled={isCanceled}>
            {info.row.original.createdAt &&
              dayjs(info.row.original.createdAt).format('DD/MM/YYYY HH:mm')}
          </CellWrapper>
        );
      },
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
      cell: (info) => {
        const isCanceled = info.row.original.status === OrderStatus.CANCELED;
        return (
          <CellWrapper isCanceled={isCanceled}>
            {info.row.original.updatedAt &&
              dayjs(info.row.original.updatedAt).format('DD/MM/YYYY HH:mm')}
          </CellWrapper>
        );
      },
    }
  ),
];
