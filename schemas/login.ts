import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string({ required_error: 'נדרש שם פרטי' }).email({ message: 'אימייל שגוי' }),
  password: z.string({ required_error: 'דרושה סיסמא' }),
});
