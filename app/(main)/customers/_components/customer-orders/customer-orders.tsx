import { getCustomerOrders } from '../../_actions';
import { OrdersTable } from '@/app/(main)/orders/_components';

interface CustomerOrdersProps {
  customerId: number;
}

export default async function CustomerOrders({ customerId }: CustomerOrdersProps) {
  const orders = await getCustomerOrders(customerId);

  return <OrdersTable orders={orders} />;
}
