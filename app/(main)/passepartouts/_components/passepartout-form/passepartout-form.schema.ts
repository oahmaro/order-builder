import { z } from 'zod';
import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from './passepartout-form.content';

export const passepartoutFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: passepartoutFormContent.t(PassepartoutFormContentPhrases.NAME_REQUIRED) }),
  description: z.string().optional(),
});
