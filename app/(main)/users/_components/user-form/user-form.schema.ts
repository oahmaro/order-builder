import { z } from 'zod';
import { UserRole } from '@prisma/client';
import { userFormContent, UserFormContentPhrases } from './user-form.content';

export const userFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  email: z
    .string()
    .email({ message: userFormContent.t(UserFormContentPhrases.INVALID_EMAIL) })
    .min(1, { message: userFormContent.t(UserFormContentPhrases.EMAIL_REQUIRED) }),
  password: z
    .string()
    .min(8, { message: userFormContent.t(UserFormContentPhrases.PASSWORD_MIN_LENGTH) }),
  role: z.nativeEnum(UserRole),
  active: z.boolean().default(true),
});
