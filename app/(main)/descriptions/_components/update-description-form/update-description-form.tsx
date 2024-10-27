'use client';

import { Description } from '@prisma/client';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';
import { Card, Stack } from '@mantine/core';

import { DescriptionForm } from '../description-form';
import { commonContent, CommonPhrases } from '@/content';
import { updateDescriptionAction } from '../../_actions';
import { DescriptionPageHeader } from '../description-page-header';
import { descriptionFormSchema } from '../description-form/description-form.schema';

import {
  DescriptionFormValues,
  useDescriptionFormContext,
} from '../description-form/description-form.container';

import {
  descriptionFormContent,
  DescriptionFormContentPhrases,
} from '../description-form/description-form.content';

export default function UpdateDescriptionForm({
  description,
  hasOrderItems,
}: {
  description: Description;
  hasOrderItems: boolean;
}) {
  const form = useDescriptionFormContext();

  const handleSubmit = async (data: DescriptionFormValues) => {
    try {
      const validatedData = descriptionFormSchema.parse(data);

      const formData = new FormData();
      formData.append('descriptionId', description.id.toString());
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description || '');

      const response = await updateDescriptionAction(formData);

      if (
        response.message ===
        descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION_UPDATED)
      ) {
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
          message: descriptionFormContent.t(DescriptionFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <DescriptionPageHeader
          name={description.name}
          descriptionId={description.id}
          hasOrderItems={hasOrderItems}
        />

        <Card shadow="sm" radius="md" padding="xl">
          <DescriptionForm />
        </Card>
      </Stack>
    </form>
  );
}
