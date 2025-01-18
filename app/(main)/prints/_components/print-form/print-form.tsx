'use client';

import { Alert, Stack, Textarea, TextInput, Title } from '@mantine/core';

import { usePrintFormContext } from './print-form.container';
import { printFormContent, PrintFormContentPhrases } from './print-form.content';

export default function PrintForm() {
  const form = usePrintFormContext();

  return (
    <>
      <Stack gap="xl" mb={80}>
        <Stack component="section">
          <Title order={4}>{printFormContent.t(PrintFormContentPhrases.NAME)}</Title>

          <TextInput
            required
            label={printFormContent.t(PrintFormContentPhrases.NAME)}
            {...form.getInputProps('name')}
          />

          <Textarea
            autosize
            minRows={4}
            maxRows={4}
            label={printFormContent.t(PrintFormContentPhrases.DESCRIPTION)}
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
