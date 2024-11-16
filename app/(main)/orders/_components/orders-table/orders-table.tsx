'use client';

import { useState, useMemo } from 'react';
import { OrderStatus } from '@prisma/client';

import { MainTable } from '@/components/main-table';
import { columns, OrderDataType } from './orders-table.columns';
import { OrderStatusFilter } from './orders-status-filter';

export interface OrdersTableProps {
  orders: OrderDataType[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);

  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  return (
    <MainTable<OrderDataType>
      data={filteredOrders}
      columns={columns}
      initialColumnsVisibility={{ id: true, createdAt: false, updatedAt: false }}
      headerActions={
        <OrderStatusFilter selectedStatus={statusFilter} onStatusChange={setStatusFilter} />
      }
    />
  );
}
