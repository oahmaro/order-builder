'use client';

import { forwardRef } from 'react';
import { Badge, Table } from '@mantine/core';
import { Order, OrderStatus } from '@prisma/client';
import classes from './orders-table.module.css';
import { OrdersTableEmptyState } from './orders-table-empty-state';

export interface OrdersTableProps {
  orders?: Order[];
}

const exampleOrders: Order[] = [
  {
    id: 1,
    createdAt: new Date(),
    amountPaid: 200,
    status: OrderStatus.DELIVERED,
    totalAmount: 800,
    remainingAmount: 600,
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
    totalAmount: 500,
    remainingAmount: 200,
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
    totalAmount: 1200,
    remainingAmount: 400,
    updatedAt: null,
    createdById: 1,
    customerId: 1,
    updatedById: null,
  },
];

const getOrderStatusMapping = (status: OrderStatus) => {
  const statusMapping = {
    [OrderStatus.DELIVERED]: { label: 'נמסר', value: 'delivered', color: 'green' },
    [OrderStatus.CANCELLED]: { label: 'מבוטל', value: 'canceled', color: 'red' },
    [OrderStatus.ON_HOLD]: { label: 'בהמתנה', value: 'on-hold', color: 'pink' },
    [OrderStatus.PENDING]: { label: 'ממתין ל', value: 'pending', color: 'orange' },
    [OrderStatus.PROCESSING]: { label: 'מעבד', value: 'processing', color: 'orange' },
    [OrderStatus.REFUNDED]: { label: 'הוחזר', value: 'refunded', color: 'cyan' },
    [OrderStatus.SHIPPED]: { label: 'נשלח', value: 'shipped', color: 'blue' },
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
        <Table.Td>{order.totalAmount}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <div ref={ref} className={classes.root}>
      {orders.length === 0 ? (
        <OrdersTableEmptyState />
      ) : (
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover stickyHeader>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>מספר הזמנה</Table.Th>
                <Table.Th>סטטוס</Table.Th>
                <Table.Th>לקוח</Table.Th>
                <Table.Th>כמות</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>

            <Table.Caption>viewing 10 - 112 orders</Table.Caption>
          </Table>
        </Table.ScrollContainer>
      )}
    </div>
  );
});

OrdersTable.displayName = 'OrdersTable';

export default OrdersTable;
