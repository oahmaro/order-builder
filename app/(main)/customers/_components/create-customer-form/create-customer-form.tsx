'use client';

import { Group, Stack, TextInput, Title } from '@mantine/core';
import { modals } from '@mantine/modals';

import classes from './create-customer-form.module.css';
import { ModalFooter } from '@/components';
import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';
import { createCustomerFormAction } from './create-customer-form.action';
import {
  CreateCustomerFormValues,
  useCreateCustomerFormContext,
} from './create-customer-form.container';

export interface CreateCustomerFormProps {}

export default function CreateCustomerForm() {
  const form = useCreateCustomerFormContext();

  const handleSubmit = async (data: CreateCustomerFormValues) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('phoneNumber', data.phoneNumber);

    if (data.email) {
      formData.append('email', data.email);
    }

    if (data.dateOfBirth) {
      formData.append('dateOfBirth', data.dateOfBirth);
    }

    await createCustomerFormAction(formData);

    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className={classes.root} noValidate>
      <Stack gap="xl">
        <Stack component="section">
          <Title order={4}>Customer details</Title>

          <Group grow wrap="nowrap" align="flex-start">
            <TextInput
              classNames={{ input: classes.input, error: classes.error }}
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.FIRST_NAME_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.FIRST_NAME_LABEL
              )}
              required
              {...form.getInputProps('firstName')}
            />

            <TextInput
              classNames={{ input: classes.input, error: classes.error }}
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.LAST_NAME_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.LAST_NAME_LABEL
              )}
              required
              {...form.getInputProps('lastName')}
            />
          </Group>

          <TextInput
            maw="calc(50% - 8px)"
            classNames={{ input: classes.input, error: classes.error }}
            label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.PHONE_NUMBER_LABEL)}
            placeholder={createCustomerFormContent.t(
              CreateCustomerFormContentPhrases.PHONE_NUMBER_LABEL
            )}
            required
            {...form.getInputProps('phoneNumber')}
          />
        </Stack>

        <Stack component="section">
          <Title order={4}>Additional information</Title>

          <Group grow wrap="nowrap" align="flex-start">
            <TextInput
              classNames={{ input: classes.input, error: classes.error }}
              label={createCustomerFormContent.t(CreateCustomerFormContentPhrases.EMAIL_LABEL)}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.EMAIL_LABEL
              )}
              type="email"
              {...form.getInputProps('email')}
            />

            <TextInput
              classNames={{ input: classes.input, error: classes.error }}
              label={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL
              )}
              placeholder={createCustomerFormContent.t(
                CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL
              )}
              {...form.getInputProps('dateOfBirth')}
            />
          </Group>
        </Stack>
      </Stack>

      <ModalFooter />
    </form>
  );
}
