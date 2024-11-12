'use client';

import { z } from 'zod';
import { UseFormReturnType } from '@mantine/form';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { Button, Group, Select, Stack, TextInput } from '@mantine/core';

import { phoneSchema } from '@/schemas';
import { phoneFormContent, PhoneFormContentPhrases } from './phone-form.content';

const countryCodes = getCountries().map((country) => ({
  value: `${country}:+${getCountryCallingCode(country)}`,
  label: `${country} (+${getCountryCallingCode(country)})`,
}));

type PhoneFields = {
  phones: z.infer<typeof phoneSchema>[];
};

interface PhoneFormProps<T extends PhoneFields> {
  form: UseFormReturnType<T>;
}

export default function PhoneForm<T extends PhoneFields>({ form }: PhoneFormProps<T>) {
  const setPhoneField = (
    index: number,
    field: keyof PhoneFields['phones'][number],
    value: string
  ) => {
    form.setFieldValue(`phones.${index}.${field}`, value as any);
  };

  return (
    <Stack>
      {form.values.phones.map((_, index) => (
        <Group key={index} grow align="flex-start">
          <Select
            label={phoneFormContent.t(PhoneFormContentPhrases.COUNTRY_CODE_LABEL)}
            placeholder={phoneFormContent.t(PhoneFormContentPhrases.COUNTRY_CODE_PLACEHOLDER)}
            required
            data={countryCodes}
            searchable
            value={`${form.values.phones[index].countryCode}:${form.values.phones[index].dialingCode}`}
            onChange={(value) => {
              if (value) {
                const [countryCode, dialingCode] = value.split(':');
                setPhoneField(index, 'countryCode', countryCode);
                setPhoneField(index, 'dialingCode', dialingCode);
              }
            }}
          />

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
            countryCode: 'IL',
            dialingCode: '+972',
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
