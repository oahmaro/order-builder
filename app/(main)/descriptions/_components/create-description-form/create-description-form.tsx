'use client';

import { Stack, TextInput, Title } from '@mantine/core';
import { modals } from '@mantine/modals';

import {
  CreateDescriptionFormValues,
  useCreateDescriptionFormContext,
} from './create-description-form.container';
import { createDescriptionFormAction } from './create-description-form.action';
import {
  createDescriptionFormContent,
  CreateDescriptionFormContentPhrases,
} from './create-description-form.content';
import { ModalFooter } from '@/components';

export default function CreateDescriptionForm() {
  const form = useCreateDescriptionFormContext();

  const handleSubmit = async (data: CreateDescriptionFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);

    await createDescriptionFormAction(formData);

    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="xl">
        <Title order={4}>Description details</Title>

        <TextInput
          placeholder={createDescriptionFormContent.t(
            CreateDescriptionFormContentPhrases.NAME_LABEL
          )}
          required
          {...form.getInputProps('name')}
        />
      </Stack>

      <ModalFooter />
    </form>
  );
}
