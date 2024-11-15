import { MainTable } from '@/components/main-table';
import { columns, OrderDataType } from './orders-table.columns';

export interface OrdersTableProps {
  orders: OrderDataType[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <MainTable<OrderDataType>
      columns={columns}
      data={orders}
      initialColumnsVisibility={{ id: true, createdAt: false, updatedAt: false }}
    />
  );
}
