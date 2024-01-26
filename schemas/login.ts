import * as z from 'zod';

export const LoginSchema = z.object({
  usernameOrEmail: z.string({ required_error: 'יש צורך בשם משתמש או דוא"ל.' }),
  password: z.string({ required_error: 'דרושה סיסמא' }),
});
