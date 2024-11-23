'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { Order, OrderItem } from '@prisma/client';
import { orderFormSchema } from './order-form.schema';

type OrderFormInput = z.input<typeof orderFormSchema>;
export type OrderFormValues = OrderFormInput;

const initialValues: OrderFormValues = {
  customerId: 0,
  amountPaid: 0,
  status: 'PENDING',
  orderItems: [
    {
      height: null,
      width: null,
      frameId: 0,
      passepartoutNum: null,
      passepartoutWidth: null,
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
      image: undefined,
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
            height: item.height ?? null,
            width: item.width ?? null,
            frameId: item.frameId ?? null,
            passepartoutNum: item.passepartoutNum ?? null,
            passepartoutWidth: item.passepartoutWidth ?? null,
            glassTypes: item.glassTypes
              ? JSON.parse(item.glassTypes as string)
              : initialValues.orderItems[0].glassTypes,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            adhesionId: item.adhesionId ?? undefined,
            printId: item.printId ?? undefined,
            descriptionId: item.descriptionId ?? undefined,
            notes: item.notes ?? undefined,
            image: item.image ?? undefined,
          })),
        }
      : {
          ...initialValues,
          customerId: 0,
        },
    validate: zodResolver(orderFormSchema),
  });

  return <OrderFormProvider form={form}>{children}</OrderFormProvider>;
}
