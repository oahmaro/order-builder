'use client';

import { Alert, Stack, Textarea, TextInput, Title } from '@mantine/core';

import { usePassepartoutFormContext } from './passepartout-form.container';
import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from './passepartout-form.content';

export default function PassepartoutForm() {
  const form = usePassepartoutFormContext();

  return (
    <>
      <Stack gap="xl">
        <Stack component="section">
          <Title order={4}>{passepartoutFormContent.t(PassepartoutFormContentPhrases.NAME)}</Title>

          <TextInput
            required
            label={passepartoutFormContent.t(PassepartoutFormContentPhrases.NAME)}
            {...form.getInputProps('name')}
          />

          <Textarea
            autosize
            minRows={4}
            maxRows={4}
            label={passepartoutFormContent.t(PassepartoutFormContentPhrases.DESCRIPTION)}
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
