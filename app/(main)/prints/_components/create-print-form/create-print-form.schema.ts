import { z } from 'zod';
import { createPrintFormContent, CreatePrintFormContentPhrases } from './create-print-form.content';

export const createPrintFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: createPrintFormContent.t(CreatePrintFormContentPhrases.NAME_REQUIRED),
    }),
});
