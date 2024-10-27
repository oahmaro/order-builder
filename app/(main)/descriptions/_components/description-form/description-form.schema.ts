import { z } from 'zod';

import { descriptionFormContent, DescriptionFormContentPhrases } from './description-form.content';

export const descriptionFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: descriptionFormContent.t(DescriptionFormContentPhrases.NAME_REQUIRED) }),
  description: z.string().optional(),
});
