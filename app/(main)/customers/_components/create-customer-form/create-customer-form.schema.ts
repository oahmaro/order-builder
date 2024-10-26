import { z } from 'zod';

import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';
import { phoneSchema } from '@/schemas/phone';
import { dateValidator } from '@/utils/date-validator';

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
  dateOfBirth: z
    .union([z.string(), z.date()])
    .optional()
    .refine(
      (value) => {
        if (value instanceof Date) {
          return !Number.isNaN(value.getTime());
        }
        return value === '' || dateValidator(value);
      },
      {
        message: createCustomerFormContent.t(
          CreateCustomerFormContentPhrases.DATE_OF_BIRTH_INVALID
        ),
      }
    )
    .transform((val) => (val instanceof Date ? val.toISOString().split('T')[0] : val)),
});
