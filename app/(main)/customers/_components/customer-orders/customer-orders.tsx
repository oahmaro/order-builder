import { OrdersTable } from '@/app/(main)/orders/_components';
import { OrderDataType } from '@/app/(main)/orders/_components/orders-table/orders-table.columns';

interface CustomerOrdersProps {
  orders: OrderDataType[];
}

export default function CustomerOrders({ orders }: CustomerOrdersProps) {
  return <OrdersTable orders={orders} />;
}
