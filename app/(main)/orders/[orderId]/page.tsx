import { Stack } from '@mantine/core';
import { notFound } from 'next/navigation';
import { OrderStatus } from '@prisma/client';

import { db } from '@/lib/db';
import { OrderForm } from '../_components/order-form';
import OrderFormContainer from '../_components/order-form/order-form.container';
import { OrderStatusBanner } from '../_components/order-form/order-status-banner';

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
      orderItems: {
        include: {
          adhesions: true,
          prints: true,
          descriptions: true,
        },
      },
    },
  });

  // Return 404 if order doesn't exist or is canceled
  if (!order || order.status === OrderStatus.CANCELED) {
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

  const isDisabled = order.status === OrderStatus.COMPLETED;

  return (
    <OrderFormContainer order={order}>
      <Stack gap="md">
        <OrderStatusBanner orderId={order.id} status={order.status} />
        <OrderForm
          isUpdate
          order={order}
          frames={frames}
          prints={prints}
          customers={customers}
          adhesions={adhesions}
          descriptions={descriptions}
          passepartouts={passepartouts}
          isDisabled={isDisabled}
        />
      </Stack>
    </OrderFormContainer>
  );
}
