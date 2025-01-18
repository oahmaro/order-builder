'use client';

import { Alert, Stack, Textarea, TextInput, Title } from '@mantine/core';

import { useDescriptionFormContext } from './description-form.container';
import { descriptionFormContent, DescriptionFormContentPhrases } from './description-form.content';

export default function DescriptionForm() {
  const form = useDescriptionFormContext();

  return (
    <>
      <Stack gap="xl" mb={80}>
        <Stack component="section">
          <Title order={4}>
            {descriptionFormContent.t(DescriptionFormContentPhrases.FRAME_DETAILS)}
          </Title>

          <TextInput
            required
            label={descriptionFormContent.t(DescriptionFormContentPhrases.NAME)}
            {...form.getInputProps('name')}
          />

          <Textarea
            autosize
            minRows={4}
            maxRows={4}
            label={descriptionFormContent.t(DescriptionFormContentPhrases.DESCRIPTION)}
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
