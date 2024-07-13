'use client';

import { modals } from '@mantine/modals';
import { Stack, TextInput, Title } from '@mantine/core';

import { ModalFooter } from '@/components';
import { createPrintFormAction } from './create-print-form.action';
import { CreatePrintFormValues, useCreatePrintFormContext } from './create-print-form.container';
import { createPrintFormContent, CreatePrintFormContentPhrases } from './create-print-form.content';

export default function CreatePrintForm() {
  const form = useCreatePrintFormContext();

  const handleSubmit = async (data: CreatePrintFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);

    await createPrintFormAction(formData);

    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="xl">
        <Title order={4}>Print details</Title>

        <TextInput
          placeholder={createPrintFormContent.t(CreatePrintFormContentPhrases.NAME_LABEL)}
          required
          {...form.getInputProps('name')}
        />
      </Stack>

      <ModalFooter />
    </form>
  );
}
