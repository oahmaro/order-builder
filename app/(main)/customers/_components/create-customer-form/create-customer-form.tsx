'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';
import { Group, Stack, TextInput, Title, Button, Select, Alert } from '@mantine/core';

import { ModalFooter } from '@/components';
import { createCustomerFormAction } from './create-customer-form.action';
import { createCustomerFormSchema } from './create-customer-form.schema';

import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';

import {
  CreateCustomerFormValues,
  useCreateCustomerFormContext,
} from './create-customer-form.container';

const countryCodes = getCountries().map((country) => ({
  value: `${country}:+${getCountryCallingCode(country)}`,
  label: `${country} (+${getCountryCallingCode(country)})`,
}));

const formatDate = (date: unknown): string => {
  if (date instanceof Date) {
    return date.toISOString().split('T')[0];
  }
  return String(date || '');
};

export default function CreateCustomerForm() {
  const form = useCreateCustomerFormContext();

  const handleSubmit = async (data: CreateCustomerFormValues) => {
    try {
      const validatedData = createCustomerFormSchema.parse({
        ...data,
        dateOfBirth: formatDate(data.dateOfBirth),
      });

      const formData = new FormData();
      formData.append('firstName', validatedData.firstName);
      formData.append('lastName', validatedData.lastName);

      const modifiedPhones = validatedData.phones.map((phone) => {
        if (!phone.countryCode) {
          return phone;
        }
        const [, code] = phone.countryCode.split(':');

        return {
          ...phone,
          countryCode: code || phone.countryCode,
        };
      });

      formData.append('phones', JSON.stringify(modifiedPhones));

      if (validatedData.email) {
        formData.append('email', validatedData.email);
      }

      if (validatedData.dateOfBirth) {
        formData.append('dateOfBirth', validatedData.dateOfBirth);
      }

      const response = await createCustomerFormAction(formData);

      if (
        response.message ===
        createCustomerFormContent.t(CreateCustomerFormContentPhrases.CUSTOMER_CREATED)
      ) {
        modals.closeAll();
        notifications.show({
          title: 'Success',
          message: response.message,
          color: 'green',
        });
      } else {
        notifications.show({
          title: 'Error',
          message: response.message,
          color: 'red',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          form.setFieldError(fieldName, err.message);
        });
      } else {
        notifications.show({
          title: 'Error',
          message: createCustomerFormContent.t(
            CreateCustomerFormContentPhrases.ERROR_WHILE_CREATING
          ),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <Stack component="section">
          <Title order={4}>Customer details</Title>

          <Group grow wrap="nowrap" align="flex-start">
            <TextInput
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.FIRST_NAME_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.FIRST_NAME_LABEL
              )}
              required
              {...form.getInputProps('firstName')}
            />

            <TextInput
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.LAST_NAME_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.LAST_NAME_LABEL
              )}
              required
              {...form.getInputProps('lastName')}
            />
          </Group>

          {form.values.phones.map((_, index) => (
            <Group key={index} grow align="flex-start">
              <Select
                label={createCustomerFormContent.t(
                  CreateCustomerFormContentPhrases.COUNTRY_CODE_LABEL
                )}
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
                label={createCustomerFormContent.t(
                  CreateCustomerFormContentPhrases.PHONE_NUMBER_LABEL
                )}
                placeholder={createCustomerFormContent.t(
                  CreateCustomerFormContentPhrases.PHONE_NUMBER_LABEL
                )}
                required
                {...form.getInputProps(`phones.${index}.number`)}
              />

              <Select
                label={createCustomerFormContent.t(
                  CreateCustomerFormContentPhrases.PHONE_TYPE_LABEL
                )}
                data={[
                  {
                    value: 'MOBILE',
                    label: createCustomerFormContent.t(
                      CreateCustomerFormContentPhrases.MOBILE_LABEL
                    ),
                  },
                  {
                    value: 'HOME',
                    label: createCustomerFormContent.t(CreateCustomerFormContentPhrases.HOME_LABEL),
                  },
                  {
                    value: 'WORK',
                    label: createCustomerFormContent.t(CreateCustomerFormContentPhrases.WORK_LABEL),
                  },
                  {
                    value: 'OTHER',
                    label: createCustomerFormContent.t(
                      CreateCustomerFormContentPhrases.OTHER_LABEL
                    ),
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
                  {createCustomerFormContent.t(CreateCustomerFormContentPhrases.REMOVE_PHONE)}
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
            {createCustomerFormContent.t(CreateCustomerFormContentPhrases.ADD_PHONE)}
          </Button>
        </Stack>

        <Stack component="section">
          <Title order={4}>Additional information</Title>

          <Group grow wrap="nowrap" align="flex-start">
            <TextInput
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.EMAIL_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.EMAIL_LABEL
              )}
              type="email"
              {...form.getInputProps('email')}
            />

            <DateInput
              label={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL
              )}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL
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
      </Stack>

      {form.errors.root && (
        <Alert color="red" title="Error" mt="md">
          {form.errors.root}
        </Alert>
      )}

      <ModalFooter />
    </form>
  );
}
