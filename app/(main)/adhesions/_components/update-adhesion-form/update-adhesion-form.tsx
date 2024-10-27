'use client';

import { z } from 'zod';
import { Adhesion } from '@prisma/client';
import { Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { AdhesionForm } from '../adhesion-form';
import { AdhesionPageHeader } from '../adhesion-page-header';

import { updateAdhesionAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { adhesionFormSchema } from '../adhesion-form/adhesion-form.schema';

import {
  adhesionFormContent,
  AdhesionFormContentPhrases,
} from '../adhesion-form/adhesion-form.content';

import {
  AdhesionFormValues,
  useAdhesionFormContext,
} from '../adhesion-form/adhesion-form.container';

export default function UpdateAdhesionForm({
  adhesion,
  hasOrderItems,
}: {
  adhesion: Adhesion;
  hasOrderItems: boolean;
}) {
  const form = useAdhesionFormContext();

  const handleSubmit = async (data: AdhesionFormValues) => {
    try {
      const validatedData = adhesionFormSchema.parse(data);
      const formData = new FormData();
      formData.append('adhesionId', adhesion.id.toString());
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description || '');

      const response = await updateAdhesionAction(formData);

      if (response.message === adhesionFormContent.t(AdhesionFormContentPhrases.ADHESION_UPDATED)) {
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
          message: adhesionFormContent.t(AdhesionFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <AdhesionPageHeader
          name={adhesion.name}
          adhesionId={adhesion.id}
          hasOrderItems={hasOrderItems}
        />

        <Card shadow="sm" radius="md" padding="xl">
          <AdhesionForm />
        </Card>
      </Stack>
    </form>
  );
}
