'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { adhesionFormSchema } from '../adhesion-form/adhesion-form.schema';

import { ModalFooter } from '@/components';
import { AdhesionForm } from '../adhesion-form';
import { createAdhesionAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';

import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../adhesion-form/adhesion-form.content';

import {
  AdhesionFormValues,
  useAdhesionFormContext,
} from '../adhesion-form/adhesion-form.container';

export default function CreateAdhesionForm() {
  const form = useAdhesionFormContext();

  const handleSubmit = async (data: AdhesionFormValues) => {
    try {
      const validatedData = adhesionFormSchema.parse(data);
      const formData = new FormData();

      formData.append('name', validatedData.name);

      if (validatedData.description) {
        formData.append('description', validatedData.description);
      }

      const response = await createAdhesionAction(formData);

      if (response.message === adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_CREATED)) {
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
          message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <AdhesionForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
