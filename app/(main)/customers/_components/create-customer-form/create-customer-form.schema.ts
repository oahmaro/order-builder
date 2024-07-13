import { z } from 'zod';
import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';
import { dateValidator, phoneNumberValidator } from '@/utils';

export const createCustomerFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.FIRST_NAME_REQUIRED),
    }),

  lastName: z
    .string()
    .trim()
    .min(1, {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.LAST_NAME_REQUIRED),
    }),

  phoneNumber: z
    .string()
    .trim()
    .min(1, {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.PHONE_NUMBER_REQUIRED),
    })
    .refine(phoneNumberValidator, {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.PHONE_NUMBER_INVALID),
    }),

  email: z.union([
    z
      .string()
      .trim()
      .email({
        message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.EMAIL_INVALID),
      }),
    z.literal(''),
  ]),

  dateOfBirth: z
    .string()
    .optional()
    .refine(dateValidator, {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.DATE_OF_BIRTH_INVALID),
    }),
});
