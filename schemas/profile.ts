import * as z from 'zod';

export const ProfileSchema = z.object({
  firstName: z
    .string({ required_error: 'נדרש שם פרטי' })
    .min(3, { message: 'מינימום 3 תווים נדרשים' }),
  lastName: z.string().optional(),
  email: z.string({ required_error: 'נדרש דוא"ל' }).email({ message: 'אימייל שגוי' }),
  username: z.string().optional(),
  currentPassword: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
});
