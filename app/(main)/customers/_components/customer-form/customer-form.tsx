import { DateInput } from '@mantine/dates';
import { countries as countryNames } from 'countries-list';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { Accordion, Alert, Button, Group, Select, Stack, TextInput, Title } from '@mantine/core';

import { customerFormContent, CustomerFormContentPhrases } from './customer-form.content';
import { useCustomerFormContext } from './customer-form.container';

const countryCodes = getCountries().map((country) => ({
  value: `${country}:+${getCountryCallingCode(country)}`,
  label: `${country} (+${getCountryCallingCode(country)})`,
}));

const countries = getCountries().map((country) => ({
  value: country,
  label: (countryNames as Record<string, { name: string }>)[country]?.name || country,
}));

export default function CustomerForm() {
  const form = useCustomerFormContext();

  return (
    <>
      <Stack gap="xl">
        <Stack component="section">
          <Title order={4}>Customer details</Title>

          <Group grow wrap="nowrap" align="flex-start">
            <TextInput
              label={customerFormContent.t(CustomerFormContentPhrases.FIRST_NAME_LABEL)}
              placeholder={customerFormContent.t(CustomerFormContentPhrases.FIRST_NAME_LABEL)}
              required
              {...form.getInputProps('firstName')}
            />

            <TextInput
              label={customerFormContent.t(CustomerFormContentPhrases.LAST_NAME_LABEL)}
              placeholder={customerFormContent.t(CustomerFormContentPhrases.LAST_NAME_LABEL)}
              required
              {...form.getInputProps('lastName')}
            />
          </Group>

          {form.values.phones.map((_, index) => (
            <Group key={index} grow align="flex-start">
              <Select
                label={customerFormContent.t(CustomerFormContentPhrases.COUNTRY_CODE_LABEL)}
                placeholder="+972"
                required
                data={countryCodes}
                searchable
                value={form.values.phones[index].countryCode}
                onChange={(value) => {
                  form.setFieldValue(`phones.${index}.countryCode`, value || '');
                }}
              />

              <TextInput
                label={customerFormContent.t(CustomerFormContentPhrases.PHONE_NUMBER_LABEL)}
                placeholder={customerFormContent.t(CustomerFormContentPhrases.PHONE_NUMBER_LABEL)}
                required
                {...form.getInputProps(`phones.${index}.number`)}
              />

              <Select
                label={customerFormContent.t(CustomerFormContentPhrases.PHONE_TYPE_LABEL)}
                data={[
                  {
                    value: 'MOBILE',
                    label: customerFormContent.t(CustomerFormContentPhrases.MOBILE_LABEL),
                  },
                  {
                    value: 'HOME',
                    label: customerFormContent.t(CustomerFormContentPhrases.HOME_LABEL),
                  },
                  {
                    value: 'WORK',
                    label: customerFormContent.t(CustomerFormContentPhrases.WORK_LABEL),
                  },
                  {
                    value: 'OTHER',
                    label: customerFormContent.t(CustomerFormContentPhrases.OTHER_LABEL),
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
                  {customerFormContent.t(CustomerFormContentPhrases.REMOVE_PHONE)}
                </Button>
              )}

              {form.values.phones.length === 1 && (
                <div style={{ marginTop: '24px', height: '36px' }} /> // Placeholder for spacing
              )}
            </Group>
          ))}

          <Button
            variant="light"
            onClick={() =>
              form.insertListItem('phones', {
                countryCode: 'IL:+972',
                number: '',
                type: 'MOBILE',
                isPrimary: false,
              })
            }
          >
            {customerFormContent.t(CustomerFormContentPhrases.ADD_PHONE)}
          </Button>
        </Stack>

        <Stack component="section">
          <Accordion variant="contained" multiple>
            <Accordion.Item value="additional-info">
              <Accordion.Control>
                <Title order={4}>
                  {customerFormContent.t(CustomerFormContentPhrases.ADDITIONAL_INFORMATION_LABEL)}
                </Title>
              </Accordion.Control>

              <Accordion.Panel>
                <Stack>
                  <Group grow wrap="nowrap" align="flex-start">
                    <TextInput
                      label={customerFormContent.t(CustomerFormContentPhrases.EMAIL_LABEL)}
                      placeholder={customerFormContent.t(CustomerFormContentPhrases.EMAIL_LABEL)}
                      type="email"
                      {...form.getInputProps('email')}
                    />

                    <DateInput
                      label={customerFormContent.t(CustomerFormContentPhrases.DATE_OF_BIRTH_LABEL)}
                      placeholder={customerFormContent.t(
                        CustomerFormContentPhrases.DATE_OF_BIRTH_LABEL
                      )}
                      clearable
                      valueFormat="YYYY-MM-DD"
                      {...form.getInputProps('dateOfBirth', {
                        onChange: (value: Date | null) => {
                          const formattedDate = value ? value.toISOString().split('T')[0] : '';
                          return formattedDate;
                        },
                      })}
                    />
                  </Group>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="address">
              <Accordion.Control>
                <Title order={4}>
                  {customerFormContent.t(CustomerFormContentPhrases.ADDRESS_LABEL)}
                </Title>
              </Accordion.Control>

              <Accordion.Panel>
                <Stack>
                  <Select
                    label={customerFormContent.t(CustomerFormContentPhrases.COUNTRY_LABEL)}
                    placeholder={customerFormContent.t(
                      CustomerFormContentPhrases.COUNTRY_PLACEHOLDER
                    )}
                    data={countries}
                    searchable
                    {...form.getInputProps('address.country')}
                  />

                  <TextInput
                    label={customerFormContent.t(CustomerFormContentPhrases.STREET_ADDRESS_LABEL)}
                    placeholder={customerFormContent.t(
                      CustomerFormContentPhrases.STREET_ADDRESS_PLACEHOLDER
                    )}
                    {...form.getInputProps('address.streetAddress')}
                  />

                  <TextInput
                    label={customerFormContent.t(CustomerFormContentPhrases.APT_SUITE_LABEL)}
                    placeholder={customerFormContent.t(
                      CustomerFormContentPhrases.APT_SUITE_PLACEHOLDER
                    )}
                    {...form.getInputProps('address.aptSuite')}
                  />

                  <Group grow>
                    <TextInput
                      label={customerFormContent.t(CustomerFormContentPhrases.CITY_LABEL)}
                      placeholder={customerFormContent.t(
                        CustomerFormContentPhrases.CITY_PLACEHOLDER
                      )}
                      {...form.getInputProps('address.city')}
                    />

                    <TextInput
                      label={customerFormContent.t(CustomerFormContentPhrases.STATE_PROVINCE_LABEL)}
                      placeholder={customerFormContent.t(
                        CustomerFormContentPhrases.STATE_PROVINCE_PLACEHOLDER
                      )}
                      {...form.getInputProps('address.stateProvince')}
                    />
                  </Group>

                  <TextInput
                    label={customerFormContent.t(CustomerFormContentPhrases.POSTAL_CODE_LABEL)}
                    placeholder={customerFormContent.t(
                      CustomerFormContentPhrases.POSTAL_CODE_PLACEHOLDER
                    )}
                    {...form.getInputProps('address.postalCode')}
                  />
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
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
