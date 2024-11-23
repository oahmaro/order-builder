import { Address, Customer, Phone } from '@prisma/client';

import { CustomerView } from '../customer-view';
import CustomerFormContainer from '../customer-form/customer-form.container';
import { OrderDataType } from '@/app/(main)/orders/_components/orders-table/orders-table.columns';

interface CustomerPageWrapperProps {
  orders: OrderDataType[];
  customer: Customer & { phones: Phone[]; address?: Address; _count: { orders: number } };
}

export default function CustomerPageWrapper({ customer, orders }: CustomerPageWrapperProps) {
  return (
    <CustomerFormContainer customer={customer}>
      <CustomerView customer={customer} orders={orders} />
    </CustomerFormContainer>
  );
}
