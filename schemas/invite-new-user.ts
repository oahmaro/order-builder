import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const InviteNewUserSchema = z.object({
  firstName: z
    .string({ required_error: 'נדרש שם פרטי' })
    .min(3, { message: 'מינימום 3 תווים נדרשים' }),
  lastName: z.string().optional(),
  email: z.string({ required_error: 'נדרש דוא"ל' }).email({ message: 'אימייל שגוי' }),
  role: z.nativeEnum(UserRole),
});
