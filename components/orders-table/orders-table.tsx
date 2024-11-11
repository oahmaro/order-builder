'use client';

import { forwardRef } from 'react';
import { Badge, Paper, Table } from '@mantine/core';
import { Order, OrderStatus } from '@prisma/client';
import classes from './orders-table.module.css';
import { OrdersTableEmptyState } from './orders-table-empty-state';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

export interface OrdersTableProps {
  orders?: Order[];
}

const exampleOrders: Order[] = [
  {
    id: 1,
    createdAt: new Date(),
    amountPaid: 200,
    status: OrderStatus.DELIVERED,
    updatedAt: null,
    createdById: 1,
    customerId: 1,
    updatedById: null,
  },
  {
    id: 2,
    createdAt: new Date(),
    amountPaid: 300,
    status: OrderStatus.DELIVERED,
    updatedAt: null,
    createdById: 1,
    customerId: 1,
    updatedById: null,
  },
  {
    id: 3,
    createdAt: new Date(),
    amountPaid: 800,
    status: OrderStatus.DELIVERED,
    updatedAt: null,
    createdById: 1,
    customerId: 1,
    updatedById: null,
  },
];

const getOrderStatusMapping = (status: OrderStatus) => {
  const statusMapping = {
    [OrderStatus.DELIVERED]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.DELIVERED),
      value: 'delivered',
      color: 'green',
    },
    [OrderStatus.CANCELLED]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.CANCELED),
      value: 'canceled',
      color: 'red',
    },
    [OrderStatus.ON_HOLD]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.ON_HOLD),
      value: 'on-hold',
      color: 'pink',
    },
    [OrderStatus.PENDING]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.PENDING),
      value: 'pending',
      color: 'orange',
    },
    [OrderStatus.PROCESSING]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.PROCESSING),
      value: 'processing',
      color: 'orange',
    },
    [OrderStatus.REFUNDED]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.REFUNDED),
      value: 'refunded',
      color: 'cyan',
    },
    [OrderStatus.SHIPPED]: {
      label: ordersTableContent.t(OrdersTableContentPhrases.SHIPPED),
      value: 'shipped',
      color: 'blue',
    },
  };

  return statusMapping[status];
};

const OrdersTable = forwardRef<HTMLDivElement, OrdersTableProps>(({ orders = [] }, ref) => {
  const rows = exampleOrders.map((order) => {
    const status = getOrderStatusMapping(order.status);

    return (
      <Table.Tr key={order.id}>
        <Table.Td>{order.id}</Table.Td>
        <Table.Td>
          <Badge color={status.color}>{status.label}</Badge>
        </Table.Td>
        <Table.Td>{order.customerId}</Table.Td>
        <Table.Td>{order.amountPaid}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Paper ref={ref} className={classes.root} radius="md" shadow="sm">
      {orders.length === 0 ? (
        <OrdersTableEmptyState />
      ) : (
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{ordersTableContent.t(OrdersTableContentPhrases.ORDER_NUMBER)}</Table.Th>
                <Table.Th>{ordersTableContent.t(OrdersTableContentPhrases.STATUS)}</Table.Th>
                <Table.Th>{ordersTableContent.t(OrdersTableContentPhrases.CUSTOMER)}</Table.Th>
                <Table.Th>{ordersTableContent.t(OrdersTableContentPhrases.AMOUNT)}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>

            <Table.Caption>
              {ordersTableContent.t(OrdersTableContentPhrases.VIEWING_ORDERS, {
                start: 10,
                end: 112,
              })}
            </Table.Caption>
          </Table>
        </Table.ScrollContainer>
      )}
    </Paper>
  );
});

OrdersTable.displayName = 'OrdersTable';

export default OrdersTable;
