'use client';

import { z } from 'zod';
import { ReactNode } from 'react';
import { createFormContext, zodResolver } from '@mantine/form';

import { Order, OrderItem, Adhesion, Print, Description } from '@prisma/client';
import { orderFormSchema } from './order-form.schema';

type OrderFormInput = z.input<typeof orderFormSchema>;
export type OrderFormValues = OrderFormInput;

const initialValues: OrderFormValues = {
  id: undefined,
  customerId: 0,
  amountPaid: 0,
  status: 'NEW',
  createdAt: new Date().toISOString(),
  orderItems: [
    {
      id: undefined,
      height: null,
      width: null,
      frameId: null,
      passepartoutId: null,
      passepartoutWidth: null,
      glassTypes: {
        transparent: false,
        matte: false,
        none: false,
        perspex: false,
        mirror: false,
      },
      adhesionIds: [],
      printIds: [],
      descriptionIds: [],
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
  order?: Order & {
    orderItems: (OrderItem & {
      adhesions: Adhesion[];
      prints: Print[];
      descriptions: Description[];
    })[];
  };
}

export default function OrderFormContainer({ children, order }: OrderFormContainerProps) {
  const form = useOrderForm({
    initialValues: order
      ? {
          id: order.id,
          customerId: order.customerId,
          amountPaid: order.amountPaid,
          status: order.status,
          createdAt: order.createdAt?.toISOString(),
          orderItems: order.orderItems.map((item) => ({
            id: item.id,
            height: item.height ?? null,
            width: item.width ?? null,
            frameId: item.frameId ?? null,
            passepartoutId: item.passepartoutId ?? null,
            passepartoutWidth: item.passepartoutWidth ?? null,
            glassTypes: item.glassTypes
              ? JSON.parse(item.glassTypes as string)
              : initialValues.orderItems[0].glassTypes,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.price,
            adhesionIds: item.adhesions?.map((a) => a.id) || [],
            printIds: item.prints?.map((p) => p.id) || [],
            descriptionIds: item.descriptions?.map((d) => d.id) || [],
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
