'use client';

import { Stack, TextInput, Title } from '@mantine/core';
import { modals } from '@mantine/modals';

import { createAdhesionFormAction } from './create-adhesion-form.action';
import {
  CreateAdhesionFormValues,
  useCreateAdhesionFormContext,
} from './create-adhesion-form.container';
import { ModalFooter } from '@/components';
import {
  createAdhesionFormContent,
  CreateAdhesionFormContentPhrases,
} from './create-adhesion-form.content';

export default function CreateAdhesionForm() {
  const form = useCreateAdhesionFormContext();

  const handleSubmit = async (data: CreateAdhesionFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);

    await createAdhesionFormAction(formData);

    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="xl">
        <Title order={4}>Description details</Title>

        <TextInput
          placeholder={createAdhesionFormContent.t(CreateAdhesionFormContentPhrases.NAME_LABEL)}
          required
          {...form.getInputProps('name')}
        />
      </Stack>

      <ModalFooter />
    </form>
  );
}
