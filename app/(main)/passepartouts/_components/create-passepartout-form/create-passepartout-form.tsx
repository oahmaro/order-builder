'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { ModalFooter } from '@/components';
import { PassepartoutForm } from '../passepartout-form';
import { commonContent, CommonPhrases } from '@/content';
import { createPassepartoutAction } from '../../_actions';
import { passepartoutFormSchema } from '../passepartout-form/passepartout-form.schema';

import {
  PassepartoutFormValues,
  usePassepartoutFormContext,
} from '../passepartout-form/passepartout-form.container';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../passepartout-form/passepartout-form.content';

export default function CreatePassepartoutForm() {
  const form = usePassepartoutFormContext();

  const handleSubmit = async (data: PassepartoutFormValues) => {
    try {
      const validatedData = passepartoutFormSchema.parse(data);
      const formData = new FormData();

      formData.append('name', validatedData.name);

      if (validatedData.description) {
        formData.append('description', validatedData.description);
      }

      const response = await createPassepartoutAction(formData);

      if (
        response.message ===
        passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_CREATED)
      ) {
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
          title: commonContent.t(CommonPhrases.ERROR),
          message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <PassepartoutForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
