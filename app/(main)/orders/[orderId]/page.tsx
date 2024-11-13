import { notFound } from 'next/navigation';

import { db } from '@/lib/db';
import { OrderForm } from '../_components/order-form';
import OrderFormContainer from '../_components/order-form/order-form.container';

interface OrderPageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const order = await db.order.findUnique({
    where: {
      id: parseInt(params.orderId, 10),
    },
    include: {
      orderItems: true,
    },
  });

  if (!order) {
    notFound();
  }

  // Fetch all the required data for the form
  const [frames, prints, customers, adhesions, descriptions, passepartouts] = await Promise.all([
    db.frame.findMany(),
    db.print.findMany(),
    db.customer.findMany({
      include: {
        phones: true,
      },
    }),
    db.adhesion.findMany(),
    db.description.findMany(),
    db.passepartout.findMany(),
  ]);

  return (
    <OrderFormContainer order={order}>
      <OrderForm
        frames={frames}
        prints={prints}
        customers={customers}
        adhesions={adhesions}
        descriptions={descriptions}
        passepartouts={passepartouts}
      />
    </OrderFormContainer>
  );
}
