import { z } from 'zod';
import { printFormContent, PrintFormContentPhrases } from './print-form.content';

export const printFormSchema = z.object({
  name: z.string().min(1, { message: printFormContent.t(PrintFormContentPhrases.NAME_REQUIRED) }),
  description: z.string().optional(),
});
