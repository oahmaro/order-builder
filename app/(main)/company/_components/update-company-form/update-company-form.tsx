'use client';

import { z } from 'zod';
import { Company } from '@prisma/client';
import { Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { CompanyForm } from '../company-form';
import { updateCompanyAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { CompanyPageHeader } from '../company-page-header';
import { companyFormSchema } from '../company-form/company-form.schema';
import { CompanyFormValues, useCompanyFormContext } from '../company-form/company-form.container';

import {
  updateCompanyFormContent,
  UpdateCompanyFormContentPhrases,
} from './update-company-form.content';
import {
  updateCompanyActionContent,
  UpdateCompanyActionContentPhrases,
} from '../../_actions/update-company-action/update-company-action.content';

export default function UpdateCompanyForm({ company }: { company: Company }) {
  const form = useCompanyFormContext();

  const handleSubmit = async (data: CompanyFormValues) => {
    try {
      const validatedData = companyFormSchema.parse(data);

      const formData = new FormData();
      formData.append('companyId', company.id.toString());
      formData.append('name', validatedData.name);
      formData.append('email', validatedData.email);

      const modifiedPhones = validatedData.phones.map((phone, index) => ({
        ...phone,
        isPrimary: index === 0,
      }));

      formData.append('phones', JSON.stringify(modifiedPhones));

      if (validatedData.address) {
        formData.append('address', JSON.stringify(validatedData.address));
      }

      const response = await updateCompanyAction(formData);

      if (
        response.message ===
        updateCompanyActionContent.t(UpdateCompanyActionContentPhrases.COMPANY_UPDATED)
      ) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
        form.resetDirty();
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
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
          title: commonContent.t(CommonPhrases.ERROR),
          message: updateCompanyFormContent.t(UpdateCompanyFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <CompanyPageHeader title={company.name} />

        <Card shadow="sm" radius="md" padding="xl">
          <CompanyForm />
        </Card>
      </Stack>
    </form>
  );
}
