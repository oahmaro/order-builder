'use client';

import { useState, useMemo, useEffect } from 'react';
import { OrderStatus } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { MainTable } from '@/components/main-table';
import { columns, OrderDataType } from './orders-table.columns';
import { OrderStatusFilter } from './orders-status-filter';

export interface OrdersTableProps {
  orders: OrderDataType[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(() => {
    const status = searchParams.get('status');
    return status ? (status as OrderStatus) : null;
  });

  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const handleStatusChange = (status: OrderStatus | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (status) {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    router.push(`/orders?${params.toString()}`);
    setStatusFilter(status);
  };

  // Sync with URL on mount and when URL changes
  useEffect(() => {
    const status = searchParams.get('status') as OrderStatus | null;
    setStatusFilter(status);
  }, [searchParams]);

  return (
    <MainTable<OrderDataType>
      data={filteredOrders}
      columns={columns}
      initialColumnsVisibility={{ id: true, createdAt: false, updatedAt: false }}
      headerActions={
        <OrderStatusFilter selectedStatus={statusFilter} onStatusChange={handleStatusChange} />
      }
    />
  );
}
