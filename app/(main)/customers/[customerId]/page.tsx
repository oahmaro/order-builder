import { db } from '@/lib/db';
import { UpdateCustomerForm } from '../_components/update-customer-form';
import CustomerFormContainer from '../_components/customer-form/customer-form.container';

export default async function CustomerPage({ params }: { params: { customerId: string } }) {
  const customer = await db.customer.findUnique({
    where: {
      id: Number(params.customerId),
    },
  });

  return (
    <CustomerFormContainer>
      {customer && <UpdateCustomerForm customer={customer} />}
    </CustomerFormContainer>
  );
}
