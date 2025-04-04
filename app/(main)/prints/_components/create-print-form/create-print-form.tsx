'use client';

import { z } from 'zod';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

import { PrintForm } from '../print-form';
import { ModalFooter } from '@/components';
import { createPrintAction } from '../../_actions';
import { commonContent, CommonPhrases } from '@/content';
import { printFormSchema } from '../print-form/print-form.schema';
import { PrintFormValues, usePrintFormContext } from '../print-form/print-form.container';
import { printFormContent, PrintFormContentPhrases } from '../print-form/print-form.content';

export default function CreatePrintForm() {
  const form = usePrintFormContext();

  const handleSubmit = async (data: PrintFormValues) => {
    try {
      const validatedData = printFormSchema.parse(data);
      const formData = new FormData();

      formData.append('name', validatedData.name);

      if (validatedData.description) {
        formData.append('description', validatedData.description);
      }

      const response = await createPrintAction(formData);

      if (response.message === printFormContent.t(PrintFormContentPhrases.PRINT_CREATED)) {
        modals.closeAll();

        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
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
          message: printFormContent.t(PrintFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <PrintForm />

      <ModalFooter
        submitLabel={commonContent.t(CommonPhrases.CREATE)}
        cancelLabel={commonContent.t(CommonPhrases.CANCEL)}
      />
    </form>
  );
}
