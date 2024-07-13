import * as z from 'zod';

import { errorMessages } from '@/utils';

export const RegisterSchema = z
  .object({
    firstName: z
      .string({ required_error: errorMessages['field-required'] })
      .min(3, { message: errorMessages['min-3'] }),
    lastName: z.string().optional(),
    email: z
      .string({ required_error: errorMessages['field-required'] })
      .email({ message: errorMessages['email-valid'] }),
    password: z
      .string({ required_error: errorMessages['field-required'] })
      .min(8, { message: errorMessages['min-8'] }),
    confirmPassword: z
      .string({ required_error: errorMessages['field-required'] })
      .min(8, { message: errorMessages['min-8'] }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages['password-match'],
    path: ['confirmPassword'],
  });
