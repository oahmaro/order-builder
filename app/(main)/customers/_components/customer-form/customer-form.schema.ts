import { z } from 'zod';
import { phoneSchema } from '@/schemas/phone/phone';
import { dateValidator } from '@/utils/date-validator';

import { customerFormContent, CustomerFormContentPhrases } from './customer-form.content';
import { addressSchema } from '@/schemas';

export const customerFormSchema = z.object({
  firstName: z.string().min(1, {
    message: customerFormContent.t(CustomerFormContentPhrases.FIRST_NAME_REQUIRED),
  }),
  lastName: z.string().min(1, {
    message: customerFormContent.t(CustomerFormContentPhrases.LAST_NAME_REQUIRED),
  }),
  phones: z.array(phoneSchema).min(1, {
    message: customerFormContent.t(CustomerFormContentPhrases.NO_VALID_PHONE),
  }),
  email: z
    .string()
    .email({
      message: customerFormContent.t(CustomerFormContentPhrases.EMAIL_INVALID),
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
        message: customerFormContent.t(CustomerFormContentPhrases.DATE_OF_BIRTH_INVALID),
      }
    )
    .transform((val) => (val instanceof Date ? val.toISOString().split('T')[0] : val)),
  address: addressSchema.optional(),
});
