import * as z from 'zod';

import { errorMessages } from '@/utils';

export const StrictPasswordSchema = z.object({
  currentPassword: z
    .string({ required_error: errorMessages['field-required'] })
    .min(3, { message: errorMessages['min-3'] }),
  password: z
    .string({ required_error: errorMessages['field-required'] })
    .min(8, { message: errorMessages['min-8'] }),
  confirmPassword: z
    .string({ required_error: errorMessages['field-required'] })
    .min(8, { message: errorMessages['min-8'] }),
});

export const OptionalPasswordSchema = z.object({
  currentPassword: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});
