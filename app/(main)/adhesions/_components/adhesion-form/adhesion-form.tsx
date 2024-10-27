'use client';

import { Alert, Stack, Textarea, TextInput, Title } from '@mantine/core';

import { useAdhesionFormContext } from './adhesion-form.container';
import { adhesionFormContent, AdhesionFormContentPhrases } from './adhesion-form.content';

export default function AdhesionForm() {
  const form = useAdhesionFormContext();

  return (
    <>
      <Stack gap="xl">
        <Stack component="section">
          <Title order={4}>{adhesionFormContent.t(AdhesionFormContentPhrases.NAME)}</Title>

          <TextInput
            required
            label={adhesionFormContent.t(AdhesionFormContentPhrases.NAME)}
            {...form.getInputProps('name')}
          />

          <Textarea
            autosize
            minRows={4}
            maxRows={4}
            label={adhesionFormContent.t(AdhesionFormContentPhrases.DESCRIPTION)}
            {...form.getInputProps('description')}
          />
        </Stack>
      </Stack>

      {form.errors.root && (
        <Alert color="red" title="Error" mt="md">
          {form.errors.root}
        </Alert>
      )}
    </>
  );
}
