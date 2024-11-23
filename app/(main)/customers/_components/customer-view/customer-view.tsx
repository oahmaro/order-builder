'use client';

import { z } from 'zod';
import { Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Address, Customer, Phone } from '@prisma/client';

import { CustomerTabs } from '../customer-tabs';
import { formatDateToISOString } from '@/utils';
import { updateCustomerAction } from '../../_actions';
import { CustomerPageHeader } from '../customer-page-header';
import { customerFormSchema } from '../customer-form/customer-form.schema';
import { OrderDataType } from '@/app/(main)/orders/_components/orders-table/orders-table.columns';

import {
  CustomerFormValues,
  useCustomerFormContext,
} from '../customer-form/customer-form.container';

import {
  customerFormContent,
  CustomerFormContentPhrases,
} from '../customer-form/customer-form.content';

interface CustomerViewProps {
  orders: OrderDataType[];
  customer: Customer & { phones: Phone[]; address?: Address; _count: { orders: number } };
}

export default function CustomerView({ customer, orders }: CustomerViewProps) {
  const form = useCustomerFormContext();
  const hasOrders = customer._count.orders > 0;

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      const validatedData = customerFormSchema.parse({
        ...data,
        dateOfBirth: formatDateToISOString(data.dateOfBirth),
      });

      const formData = new FormData();
      formData.append('customerId', customer.id.toString());
      formData.append('firstName', validatedData.firstName);
      formData.append('lastName', validatedData.lastName);

      const modifiedPhones = validatedData.phones.map((phone, index) => {
        if (!phone.countryCode) {
          return phone;
        }

        const [, code] = phone.countryCode.split(':');

        return {
          ...phone,
          countryCode: code || phone.countryCode,
          isPrimary: index === 0,
        };
      });

      formData.append('phones', JSON.stringify(modifiedPhones));

      if (validatedData.email) {
        formData.append('email', validatedData.email);
      }

      if (validatedData.dateOfBirth) {
        formData.append('dateOfBirth', validatedData.dateOfBirth);
      }

      if (validatedData.address) {
        formData.append('address', JSON.stringify(validatedData.address));
      }

      const response = await updateCustomerAction(formData);

      if (response.message === customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_UPDATED)) {
        notifications.show({
          title: 'Success',
          message: response.message,
          color: 'green',
        });
        form.resetDirty();
      } else {
        notifications.show({
          title: 'Error',
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
          title: 'Error',
          message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <CustomerPageHeader
          name={`${customer?.firstName} ${customer?.lastName}`}
          hasOrders={hasOrders}
          customerId={customer.id}
        />

        <CustomerTabs customer={customer} orders={orders} />
      </Stack>
    </form>
  );
}
