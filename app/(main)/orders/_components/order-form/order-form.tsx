'use client';

import * as z from 'zod';
import { useState } from 'react';
import { Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';

import {
  Frame,
  Print,
  Phone,
  Company,
  Address,
  Customer,
  Adhesion,
  Description,
  Passepartout,
} from '@prisma/client';

import { OrderItems } from '../order-items';
import { orderFormSchema } from './order-form.schema';
import { OrderHeaderCard } from '../order-header-card';
import { OrderFormFooter } from '../order-form-footer';
import { commonContent, CommonPhrases } from '@/content';
import { useOrderFormContext } from './order-form.container';
import { OrderFormAddSection } from '../order-form-add-section';
import { createOrderAction, updateOrderAction } from '../../_actions';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';

interface OrderFormProps {
  customers: (Customer & {
    phones: Phone[];
    address?: Address;
  })[];
  frames: Frame[];
  prints: Print[];
  adhesions: Adhesion[];
  descriptions: Description[];
  passepartouts: Passepartout[];
  isUpdate?: boolean;
  company?: Company & {
    phones: Phone[];
    address?: Address;
  };
  isDisabled?: boolean;
}

const mapCompanyData = (company?: Company & { phones: Phone[]; address?: Address }) => {
  if (!company) return undefined;

  return {
    name: company.name,
    email: company.email,
    phones: company.phones.map(({ number, isPrimary }) => ({
      number,
      isPrimary,
    })),
    address: company.address && {
      streetAddress: company.address.streetAddress || undefined,
      city: company.address.city || undefined,
    },
  };
};

export default function OrderForm({
  customers,
  frames,
  prints,
  adhesions,
  descriptions,
  passepartouts,
  isUpdate,
  company,
  isDisabled,
}: OrderFormProps) {
  const form = useOrderFormContext();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const validatedData = orderFormSchema.parse(values);
      const formData = new FormData();

      if (isUpdate && form.values?.id) {
        formData.append('orderId', form.values.id.toString());
      }

      // Add basic order data
      formData.append('customerId', validatedData.customerId.toString());
      formData.append('amountPaid', validatedData.amountPaid.toString());
      formData.append('status', validatedData.status);

      // Handle order items and their images separately
      const orderItemsWithoutFiles = validatedData.orderItems.map((item) => {
        const { imageFile, ...itemWithoutFile } = item;
        return {
          ...itemWithoutFile,
          image: item.image === null ? null : item.image,
        };
      });

      formData.append('orderItems', JSON.stringify(orderItemsWithoutFiles));

      // Append image files separately
      validatedData.orderItems.forEach((item, index) => {
        if (item.imageFile) {
          formData.append(`orderItem${index}Image`, item.imageFile);
        }
      });

      const response = await (isUpdate ? updateOrderAction(formData) : createOrderAction(formData));

      if (
        response.message === orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED) ||
        response.message === orderFormContent.t(OrderFormContentPhrases.ORDER_UPDATED)
      ) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });

        form.resetDirty();

        if (!isUpdate) {
          router.push(`/orders/${response.orderId}`);
        }
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: response.message,
          color: 'red',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          form.setFieldError(fieldName, err.message);
        });
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="sm">
        <OrderHeaderCard
          customers={customers}
          company={mapCompanyData(company)}
          disabled={isDisabled}
        />

        <OrderItems
          frames={frames}
          prints={prints}
          adhesions={adhesions}
          descriptions={descriptions}
          passepartouts={passepartouts}
          isDisabled={isDisabled}
        />

        <OrderFormAddSection isDisabled={isDisabled} />
        <OrderFormFooter isUpdate={isUpdate} isSubmitting={isSubmitting} isDisabled={isDisabled} />
      </Stack>
    </form>
  );
}
