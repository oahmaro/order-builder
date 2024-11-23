import { Customer, Phone, Address } from '@prisma/client';

import { db } from '@/lib/db';
import { CustomerPageWrapper } from '../_components';
import { getCustomerOrders } from '../_actions';

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

  const orders = await getCustomerOrders(customer.id);

  return customer && <CustomerPageWrapper customer={customer} orders={orders} />;
}
