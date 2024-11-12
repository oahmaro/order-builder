'use client';

import { z } from 'zod';
import { Card, Stack } from '@mantine/core';
import { Passepartout } from '@prisma/client';
import { notifications } from '@mantine/notifications';

import { PassepartoutForm } from '../passepartout-form';
import { commonContent, CommonPhrases } from '@/content';
import { updatePassepartoutAction } from '../../_actions';
import { PassepartoutPageHeader } from '../passepartout-page-header';
import { passepartoutFormSchema } from '../passepartout-form/passepartout-form.schema';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../passepartout-form/passepartout-form.content';

import {
  PassepartoutFormValues,
  usePassepartoutFormContext,
} from '../passepartout-form/passepartout-form.container';

interface UpdatePassepartoutFormProps {
  hasOrderItems: boolean;
  passepartout: Passepartout;
}

export default function UpdatePassepartoutForm({
  passepartout,
  hasOrderItems,
}: UpdatePassepartoutFormProps) {
  const form = usePassepartoutFormContext();

  const handleSubmit = async (data: PassepartoutFormValues) => {
    try {
      const validatedData = passepartoutFormSchema.parse(data);

      const formData = new FormData();
      formData.append('passepartoutId', passepartout.id.toString());
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description || '');

      const response = await updatePassepartoutAction(formData);

      if (
        response.message ===
        passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_UPDATED)
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
          message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <PassepartoutPageHeader
          name={passepartout.name}
          passepartoutId={passepartout.id}
          hasOrderItems={hasOrderItems}
        />

        <Card shadow="sm" radius="md" padding="xl">
          <PassepartoutForm />
        </Card>
      </Stack>
    </form>
  );
}
