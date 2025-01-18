'use client';

import { Alert, Stack, TextInput, Textarea, Title } from '@mantine/core';

import { useFrameFormContext } from './frame-form.container';
import { frameFormContent, FrameFormContentPhrases } from './frame-form.content';

export default function FrameForm() {
  const form = useFrameFormContext();

  return (
    <>
      <Stack gap="xl" mb={80}>
        <Stack component="section">
          <Title order={4}>{frameFormContent.t(FrameFormContentPhrases.FRAME_DETAILS)}</Title>

          <TextInput
            required
            label={frameFormContent.t(FrameFormContentPhrases.NAME)}
            {...form.getInputProps('name')}
          />

          <Textarea
            autosize
            minRows={4}
            maxRows={4}
            label={frameFormContent.t(FrameFormContentPhrases.DESCRIPTION)}
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
