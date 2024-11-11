'use client';

import { Badge } from '@mantine/core';
import { Order, OrderStatus } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

type OrderDataType = Partial<Order>;

const columnHelper = createColumnHelper<OrderDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: ordersTableContent.t(OrdersTableContentPhrases.ID),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('status', {
    header: ordersTableContent.t(OrdersTableContentPhrases.STATUS),
    cell: (info) => (
      <Badge color={getOrderStatusMapping(info.getValue() as OrderStatus).color}>
        {getOrderStatusMapping(info.getValue() as OrderStatus).label}
      </Badge>
    ),
  }),
];
