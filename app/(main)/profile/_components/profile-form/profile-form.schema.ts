import { z } from 'zod';

import { errorMessages } from '@/utils';
import { OptionalPasswordSchema } from '@/schemas/password';

const profileSchema = z.object({
  firstName: z
    .string({ required_error: errorMessages['field-required'] })
    .min(3, { message: errorMessages['min-3'] }),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: errorMessages['field-required'] })
    .email({ message: errorMessages['email-valid'] }),
  username: z.string().optional(),
});

export const profileFormSchema = z.object({
  profile: profileSchema,
  password: OptionalPasswordSchema,
});
