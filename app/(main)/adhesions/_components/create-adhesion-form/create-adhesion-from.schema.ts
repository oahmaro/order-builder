import { z } from 'zod';

import {
  createAdhesionFormContent,
  CreateAdhesionFormContentPhrases,
} from './create-adhesion-form.content';

export const createAdhesionFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: createAdhesionFormContent.t(CreateAdhesionFormContentPhrases.NAME_REQUIRED),
    }),
});
