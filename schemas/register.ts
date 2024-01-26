import * as z from 'zod';

export const RegisterSchema = z
  .object({
    firstName: z
      .string({ required_error: 'נדרש שם פרטי' })
      .min(3, { message: 'מינימום 3 תווים נדרשים' }),
    lastName: z.string().optional(),
    email: z.string({ required_error: 'נדרש דוא"ל' }).email({ message: 'אימייל שגוי' }),
    password: z
      .string({ required_error: 'דרושה סיסמא' })
      .min(8, { message: 'מינימום 8 תווים נדרשים' }),
    confirmPassword: z
      .string({ required_error: 'אישור סיסמה נדרשת' })
      .min(8, { message: 'מינימום 8 תווים נדרשים' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'הסיסמאות אינן תואמות',
    path: ['confirmPassword'],
  });
