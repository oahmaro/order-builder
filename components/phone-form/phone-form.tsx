'use client';

import { z } from 'zod';
import { UseFormReturnType } from '@mantine/form';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';

import { phoneSchema } from '@/schemas';
import { phoneFormContent, PhoneFormContentPhrases } from './phone-form.content';

type PhoneFields = {
  phones: z.infer<typeof phoneSchema>[];
};

interface PhoneFormProps<T extends PhoneFields> {
  form: UseFormReturnType<T>;
}

export default function PhoneForm<T extends PhoneFields>({ form }: PhoneFormProps<T>) {
  return (
    <Stack>
      {form.values.phones.map((_, index) => (
        <Group key={index} grow align="flex-start">
          <TextInput
            label={phoneFormContent.t(PhoneFormContentPhrases.PHONE_NUMBER_LABEL)}
            placeholder={phoneFormContent.t(PhoneFormContentPhrases.PHONE_NUMBER_PLACEHOLDER)}
            required
            {...form.getInputProps(`phones.${index}.number`)}
          />

          <Select
            allowDeselect={false}
            label={phoneFormContent.t(PhoneFormContentPhrases.PHONE_TYPE_LABEL)}
            data={[
              {
                value: 'MOBILE',
                label: phoneFormContent.t(PhoneFormContentPhrases.MOBILE_LABEL),
              },
              {
                value: 'HOME',
                label: phoneFormContent.t(PhoneFormContentPhrases.HOME_LABEL),
              },
              {
                value: 'WORK',
                label: phoneFormContent.t(PhoneFormContentPhrases.WORK_LABEL),
              },
              {
                value: 'OTHER',
                label: phoneFormContent.t(PhoneFormContentPhrases.OTHER_LABEL),
              },
            ]}
            {...form.getInputProps(`phones.${index}.type`)}
          />

          {form.values.phones.length > 1 && (
            <Button
              mt={24}
              variant="outline"
              color="red"
              onClick={() => form.removeListItem('phones', index)}
            >
              {phoneFormContent.t(PhoneFormContentPhrases.REMOVE_PHONE)}
            </Button>
          )}

          {form.values.phones.length === 1 && <div style={{ marginTop: '24px', height: '36px' }} />}
        </Group>
      ))}

      <Button
        variant="light"
        onClick={() =>
          form.insertListItem('phones', {
            number: '',
            type: 'MOBILE',
            isPrimary: false,
          })
        }
      >
        {phoneFormContent.t(PhoneFormContentPhrases.ADD_PHONE)}
      </Button>
    </Stack>
  );
}
