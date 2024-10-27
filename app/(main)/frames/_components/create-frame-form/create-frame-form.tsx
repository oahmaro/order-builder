'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { FrameForm } from '../frame-form';
import { ModalFooter } from '@/components';
import { createFrameAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { frameFormSchema } from '../frame-form/frame-form.schema';
import { FrameFormValues, useFrameFormContext } from '../frame-form/frame-form.container';
import { frameFormContent, FrameFormContentPhrases } from '../frame-form/frame-form.content';

export default function CreateFrameForm() {
  const form = useFrameFormContext();

  const handleSubmit = async (data: FrameFormValues) => {
    try {
      const validatedData = frameFormSchema.parse(data);

      const formData = new FormData();

      formData.append('name', validatedData.name);

      if (validatedData.description) {
        formData.append('description', validatedData.description);
      }

      const response = await createFrameAction(formData);

      if (response.message === frameFormContent.t(FrameFormContentPhrases.FRAME_CREATED)) {
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
          message: frameFormContent.t(FrameFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <FrameForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
