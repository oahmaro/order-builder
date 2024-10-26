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
    },
  })) as Customer & { phones: Phone[]; address?: Address };

  return (
    <>
      {customer && (
        <CustomerFormContainer customer={customer}>
          <UpdateCustomerForm customer={customer} />
        </CustomerFormContainer>
      )}
    </>
  );
}
