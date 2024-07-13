import * as z from 'zod';
import { errorMessages } from '@/utils';

export const LoginSchema = z.object({
  usernameOrEmail: z.string({ required_error: errorMessages['field-required'] }),
  password: z.string({ required_error: errorMessages['field-required'] }),
});
