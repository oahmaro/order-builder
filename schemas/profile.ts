import * as z from 'zod';

import { OptionalPasswordSchema } from './password';
import { errorMessages } from '@/utils';

export const ProfileSchema = z.object({
  firstName: z
    .string({ required_error: errorMessages['field-required'] })
    .min(3, { message: errorMessages['min-3'] }),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: errorMessages['field-required'] })
    .email({ message: errorMessages['email-valid'] }),
  username: z.string().optional(),
});

export const ProfileFormSchema = z.object({
  profile: ProfileSchema,
  password: OptionalPasswordSchema,
});
