import { Customer, Phone, Address } from '@prisma/client';

import { db } from '@/lib/db';
import { UpdateCustomerForm } from '../_components/update-customer-form';
import CustomerFormContainer from '../_components/customer-form/customer-form.container';

export default async function CustomerPage({ params }: { params: { customerId: string } }) {
  const customer = (await db.customer.findUnique({
    where: {
      id: Number(params.customerId),
    },
    include: {
      phones: true,
      address: true,
      _count: {
        select: { orders: true },
      },
    },
  })) as Customer & { phones: Phone[]; address?: Address; _count: { orders: number } };

  const hasOrders = customer?._count.orders > 0;

  return (
    <>
      {customer && (
        <CustomerFormContainer customer={customer}>
          <UpdateCustomerForm customer={customer} hasOrders={hasOrders} />
        </CustomerFormContainer>
      )}
    </>
  );
}
