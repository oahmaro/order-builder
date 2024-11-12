'use client';

import { DateInput } from '@mantine/dates';
import { Accordion, Alert, Group, Stack, TextInput, Title } from '@mantine/core';

import { AddressForm, PhoneForm } from '@/components';
import { useCustomerFormContext } from './customer-form.container';
import { customerFormContent, CustomerFormContentPhrases } from './customer-form.content';

export default function CustomerForm() {
  const form = useCustomerFormContext();

  return (
    <>
      <Stack gap="xl">
        <Stack component="section">
          <Title order={4}>
            {customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_DETAILS)}
          </Title>

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

          <PhoneForm form={form} />
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
                      value={form.values.dateOfBirth ? new Date(form.values.dateOfBirth) : null}
                      onChange={(value) => {
                        const formattedDate = value ? value.toISOString().split('T')[0] : '';
                        form.setFieldValue('dateOfBirth', formattedDate);
                      }}
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
                <AddressForm form={form} />
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
