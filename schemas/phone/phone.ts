import { z } from 'zod';

import { phoneContent, PhoneContentPhrases } from './phone.content';

export const phoneSchema = z.object({
  number: z.string().min(1, { message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_REQUIRED) }),
  type: z.enum(['MOBILE', 'HOME', 'WORK', 'OTHER']),
  isPrimary: z.boolean().default(false),
});
