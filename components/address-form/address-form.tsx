'use client';

import { z } from 'zod';
import { getCountries } from 'libphonenumber-js';
import { UseFormReturnType } from '@mantine/form';
import { countries as countryNames } from 'countries-list';
import { Group, Select, Stack, TextInput } from '@mantine/core';

import { addressSchema } from '@/schemas';
import { addressContent, AddressContentPhrases } from './address-form.content';

const countries = getCountries().map((country) => ({
  value: country,
  label: (countryNames as Record<string, { name: string }>)[country]?.name || country,
}));

type AddressFields = {
  address?: z.infer<typeof addressSchema>;
};

interface AddressFormProps<T extends AddressFields> {
  form: UseFormReturnType<T>;
}

export default function AddressForm<T extends AddressFields>({ form }: AddressFormProps<T>) {
  return (
    <Stack maw={500}>
      <Select
        searchable
        data={countries}
        label={addressContent.t(AddressContentPhrases.COUNTRY_LABEL)}
        placeholder={addressContent.t(AddressContentPhrases.COUNTRY_PLACEHOLDER)}
        {...form.getInputProps('address.country')}
      />

      <TextInput
        label={addressContent.t(AddressContentPhrases.STREET_ADDRESS_LABEL)}
        placeholder={addressContent.t(AddressContentPhrases.STREET_ADDRESS_PLACEHOLDER)}
        {...form.getInputProps('address.streetAddress')}
      />

      <TextInput
        label={addressContent.t(AddressContentPhrases.APT_SUITE_LABEL)}
        placeholder={addressContent.t(AddressContentPhrases.APT_SUITE_PLACEHOLDER)}
        {...form.getInputProps('address.aptSuite')}
      />

      <Group grow>
        <TextInput
          label={addressContent.t(AddressContentPhrases.CITY_LABEL)}
          placeholder={addressContent.t(AddressContentPhrases.CITY_PLACEHOLDER)}
          {...form.getInputProps('address.city')}
        />

        <TextInput
          label={addressContent.t(AddressContentPhrases.STATE_PROVINCE_LABEL)}
          placeholder={addressContent.t(AddressContentPhrases.STATE_PROVINCE_PLACEHOLDER)}
          {...form.getInputProps('address.stateProvince')}
        />
      </Group>

      <TextInput
        label={addressContent.t(AddressContentPhrases.POSTAL_CODE_LABEL)}
        placeholder={addressContent.t(AddressContentPhrases.POSTAL_CODE_PLACEHOLDER)}
        {...form.getInputProps('address.postalCode')}
      />
    </Stack>
  );
}
