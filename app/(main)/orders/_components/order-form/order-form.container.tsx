'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { Order, OrderItem } from '@prisma/client';
import { orderFormSchema } from './order-form.schema';

export type OrderFormValues = z.infer<typeof orderFormSchema>;

const initialValues: OrderFormValues = {
  customerId: 0,
  amountPaid: 0,
  status: 'PENDING',
  orderItems: [
    {
      height: 0,
      width: 0,
      frameId: 0,
      passepartoutNum: 0,
      passepartoutWidth: 0,
      glassTypes: {
        transparent: false,
        matte: false,
        none: false,
        perspex: false,
        mirror: false,
      },
      unitPrice: 0,
      quantity: 1,
      price: 0,
    },
  ],
};

export const [OrderFormProvider, useOrderFormContext, useOrderForm] =
  createFormContext<OrderFormValues>();

interface OrderFormContainerProps {
  children: ReactNode;
  order?: Order & { orderItems: OrderItem[] };
}

export default function OrderFormContainer({ children, order }: OrderFormContainerProps) {
  const form = useOrderForm({
    initialValues: order
      ? {
          customerId: order.customerId,
          amountPaid: order.amountPaid,
          status: order.status,
          orderItems: order.orderItems.map((item) => ({
            height: item.height,
            width: item.width,
            frameId: item.frameId,
            passepartoutNum: item.passepartoutNum,
            passepartoutWidth: item.passepartoutWidth,
            glassTypes: item.glassTypes as OrderFormValues['orderItems'][0]['glassTypes'],
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            adhesionId: item.adhesionId ?? undefined,
            printId: item.printId ?? undefined,
            image: item.image ?? undefined,
          })),
        }
      : initialValues,
    validate: zodResolver(orderFormSchema),
  });

  return <OrderFormProvider form={form}>{children}</OrderFormProvider>;
}
