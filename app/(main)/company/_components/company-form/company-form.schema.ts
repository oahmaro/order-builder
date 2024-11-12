import { z } from 'zod';

import { addressSchema, phoneSchema } from '@/schemas';
import { companyFormContent, CompanyFormContentPhrases } from './company-form.content';

export const companyFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: companyFormContent.t(CompanyFormContentPhrases.NAME_REQUIRED) }),
  email: z
    .string()
    .email()
    .min(1, { message: companyFormContent.t(CompanyFormContentPhrases.EMAIL_REQUIRED) }),
  address: addressSchema,
  phones: z.array(phoneSchema).min(1),
});
