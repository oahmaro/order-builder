'use client';

import { OrderStatus } from '@prisma/client';
import { Select } from '@mantine/core';

import { getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

interface OrderStatusSelectProps {
  currentStatus: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
}

export function OrderStatusSelect({ currentStatus, onStatusChange }: OrderStatusSelectProps) {
  const statusOptions = Object.values(OrderStatus).map((status) => ({
    value: status,
    label: getOrderStatusMapping(status).label,
  }));

  return (
    <Select
      data={statusOptions}
      value={currentStatus}
      onChange={(value) => onStatusChange(value as OrderStatus)}
      placeholder={ordersTableContent.t(OrdersTableContentPhrases.UPDATE_STATUS)}
    />
  );
}
