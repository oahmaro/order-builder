'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { Order, OrderItem } from '@prisma/client';
import { orderFormSchema } from './order-form.schema';

type OrderFormInput = z.input<typeof orderFormSchema>;
export type OrderFormValues = OrderFormInput;

const initialValues: OrderFormValues = {
  customerId: '',
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
          customerId: String(order.customerId),
          amountPaid: order.amountPaid,
          status: order.status,
          orderItems: order.orderItems.map((item) => ({
            height: item.height,
            width: item.width,
            frameId: item.frameId ?? undefined,
            passepartoutNum: item.passepartoutNum,
            passepartoutWidth: item.passepartoutWidth,
            glassTypes: item.glassTypes
              ? JSON.parse(item.glassTypes as string)
              : {
                  transparent: false,
                  matte: false,
                  none: false,
                  perspex: false,
                  mirror: false,
                },
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
          customerId: '',
        },
    validate: zodResolver(orderFormSchema),
  });

  return <OrderFormProvider form={form}>{children}</OrderFormProvider>;
}
