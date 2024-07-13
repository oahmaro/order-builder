import * as z from 'zod';

import { UserRole } from '@prisma/client';
import { errorMessages } from '@/utils';

export const InviteNewUserSchema = z.object({
  firstName: z
    .string({ required_error: errorMessages['field-required'] })
    .min(3, { message: errorMessages['min-3'] }),
  lastName: z.string().optional(),
  email: z
    .string({ required_error: errorMessages['field-required'] })
    .email({ message: errorMessages['email-valid'] }),
  role: z.nativeEnum(UserRole),
});
