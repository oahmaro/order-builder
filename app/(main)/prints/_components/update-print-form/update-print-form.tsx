'use client';

import { z } from 'zod';
import { Print } from '@prisma/client';
import { Card, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { PrintForm } from '../print-form';
import { updatePrintAction } from '../../_actions';
import { PrintPageHeader } from '../print-page-header';
import { commonContent, CommonPhrases } from '@/content';
import { printFormSchema } from '../print-form/print-form.schema';
import { PrintFormValues, usePrintFormContext } from '../print-form/print-form.container';
import { printFormContent, PrintFormContentPhrases } from '../print-form/print-form.content';

export default function UpdatePrintForm({
  print,
  hasOrderItems,
}: {
  print: Print;
  hasOrderItems: boolean;
}) {
  const form = usePrintFormContext();

  const handleSubmit = async (data: PrintFormValues) => {
    try {
      const validatedData = printFormSchema.parse(data);

      const formData = new FormData();
      formData.append('printId', print.id.toString());
      formData.append('name', validatedData.name);
      formData.append('description', validatedData.description || '');

      const response = await updatePrintAction(formData);

      if (response.message === printFormContent.t(PrintFormContentPhrases.PRINT_UPDATED)) {
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
          message: printFormContent.t(PrintFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <PrintPageHeader name={print.name} printId={print.id} hasOrderItems={hasOrderItems} />

        <Card shadow="sm" radius="md" padding="xl">
          <PrintForm />
        </Card>
      </Stack>
    </form>
  );
}
