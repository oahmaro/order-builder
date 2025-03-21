'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { ModalFooter } from '@/components';
import { formatDateToISOString } from '@/utils';
import { createCustomerAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { customerFormSchema } from '../customer-form/customer-form.schema';

import { CustomerForm } from '../customer-form';

import {
  CustomerFormValues,
  useCustomerFormContext,
} from '../customer-form/customer-form.container';
import {
  customerFormContent,
  CustomerFormContentPhrases,
} from '../customer-form/customer-form.content';

export default function CreateCustomerForm() {
  const form = useCustomerFormContext();

  const handleSubmit = async (data: CustomerFormValues) => {
    try {
      const validatedData = customerFormSchema.parse({
        ...data,
        dateOfBirth: formatDateToISOString(data.dateOfBirth),
      });

      const formData = new FormData();
      formData.append('firstName', validatedData.firstName);
      formData.append('lastName', validatedData.lastName);

      const modifiedPhones = validatedData.phones.map((phone, index) => ({
        ...phone,
        isPrimary: index === 0,
      }));

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

      const response = await createCustomerAction(formData);

      if (response.message === customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_CREATED)) {
        modals.closeAll();

        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
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
          title: 'Error',
          message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <CustomerForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
