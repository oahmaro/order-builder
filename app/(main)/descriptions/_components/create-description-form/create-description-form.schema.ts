import { z } from 'zod';

import {
  createDescriptionFormContent,
  CreateDescriptionFormContentPhrases,
} from './create-description-form.content';

export const createDescriptionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: createDescriptionFormContent.t(CreateDescriptionFormContentPhrases.NAME_REQUIRED),
    }),
});
