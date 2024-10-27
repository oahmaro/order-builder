'use client';

import { z } from 'zod';
import { Frame } from '@prisma/client';
import { Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { FrameForm } from '../frame-form';
import { updateFrameAction } from '../../_actions';
import { FramePageHeader } from '../frame-page-header';
import { commonContent, CommonPhrases } from '@/content';
import { frameFormSchema } from '../frame-form/frame-form.schema';
import { FrameFormValues, useFrameFormContext } from '../frame-form/frame-form.container';
import { frameFormContent, FrameFormContentPhrases } from '../frame-form/frame-form.content';

export default function UpdateFrameForm({
  frame,
  hasOrderItems,
}: {
  frame: Frame;
  hasOrderItems: boolean;
}) {
  const form = useFrameFormContext();

  const handleSubmit = async (data: FrameFormValues) => {
    try {
      const validatedData = frameFormSchema.parse(data);

      const formData = new FormData();
      formData.append('frameId', frame.id.toString());
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description || '');

      const response = await updateFrameAction(formData);

      if (response.message === frameFormContent.t(FrameFormContentPhrases.FRAME_UPDATED)) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });

        form.resetDirty();
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
          message: frameFormContent.t(FrameFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <FramePageHeader name={frame.name} frameId={frame.id} hasOrderItems={hasOrderItems} />

        <Card shadow="sm" radius="md" padding="xl">
          <FrameForm />
        </Card>
      </Stack>
    </form>
  );
}
