import { z } from 'zod';

import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';
import { phoneSchema } from '@/schemas/phone';

export const createCustomerFormSchema = z.object({
  firstName: z.string().min(1, {
    message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.FIRST_NAME_REQUIRED),
  }),
  lastName: z.string().min(1, {
    message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.LAST_NAME_REQUIRED),
  }),
  phones: z.array(phoneSchema).min(1, {
    message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.NO_VALID_PHONE),
  }),
  email: z
    .string()
    .email({
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.EMAIL_INVALID),
    })
    .optional()
    .or(z.literal('')),
  dateOfBirth: z.string().optional().or(z.literal('')),
});
