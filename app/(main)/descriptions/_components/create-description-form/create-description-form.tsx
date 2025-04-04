'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { ModalFooter } from '@/components';
import { DescriptionForm } from '../description-form';
import { commonContent, CommonPhrases } from '@/content';
import { createDescriptionAction } from '../../_actions/create-description.action';
import { descriptionFormSchema } from '../description-form/description-form.schema';

import {
  DescriptionFormValues,
  useDescriptionFormContext,
} from '../description-form/description-form.container';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../description-form/description-form.content';

export default function CreateDescriptionForm() {
  const form = useDescriptionFormContext();

  const handleSubmit = async (data: DescriptionFormValues) => {
    try {
      const validatedData = descriptionFormSchema.parse(data);

      const formData = new FormData();

      formData.append('name', validatedData.name);

      if (validatedData.description) {
        formData.append('description', validatedData.description);
      }

      const response = await createDescriptionAction(formData);

      if (
        response.message ===
        descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_CREATED)
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
          message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <DescriptionForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
