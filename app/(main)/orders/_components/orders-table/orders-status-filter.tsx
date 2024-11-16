'use client';

import { OrderStatus } from '@prisma/client';
import { Select } from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

import { getOrderStatusMapping } from '@/utils';
import { ordersTableContent, OrdersTableContentPhrases } from './orders-table.content';

interface OrderStatusFilterProps {
  selectedStatus: OrderStatus | null;
  onStatusChange: (status: OrderStatus | null) => void;
}

export function OrderStatusFilter({ selectedStatus, onStatusChange }: OrderStatusFilterProps) {
  const statusOptions = [
    { value: '', label: 'הכל' },
    ...Object.values(OrderStatus).map((status) => ({
      value: status,
      label: getOrderStatusMapping(status).label,
    })),
  ];

  return (
    <Select
      size="sm"
      data={statusOptions}
      value={selectedStatus || ''}
      leftSection={<IconFilter size={16} />}
      onChange={(value) => onStatusChange(value as OrderStatus | null)}
      placeholder={ordersTableContent.t(OrdersTableContentPhrases.ORDER_STATUS_FILTER)}
      styles={{
        root: { display: 'flex', alignItems: 'center' },
        input: { width: 200 },
      }}
    />
  );
}
