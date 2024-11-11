import { Order } from '@prisma/client';

import { columns } from './orders-table.columns';
import { MainTable } from '@/components/main-table';

type OrderDataType = Partial<Order>;

export interface OrdersTableProps {
  orders: OrderDataType[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return <MainTable<OrderDataType> columns={columns} data={orders} navigateOnRowClick />;
}
