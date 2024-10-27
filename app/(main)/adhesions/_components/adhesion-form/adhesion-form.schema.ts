import { z } from 'zod';

import { adhesionFormContent, AdhesionFormContentPhrases } from './adhesion-form.content';

export const adhesionFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: adhesionFormContent.t(AdhesionFormContentPhrases.NAME_REQUIRED) }),
  description: z.string().optional(),
});
