import { z } from 'zod';

import { phoneNumberValidator } from '@/utils';
import { phoneContent, PhoneContentPhrases } from './phone.content';

export const phoneSchema = z
  .object({
    countryCode: z
      .string()
      .trim()
      .min(1, {
        message: phoneContent.t(PhoneContentPhrases.COUNTRY_CODE_REQUIRED),
      }),
    dialingCode: z
      .string()
      .trim()
      .min(1, {
        message: phoneContent.t(PhoneContentPhrases.DIALING_CODE_REQUIRED),
      }),
    number: z
      .string()
      .trim()
      .min(1, {
        message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_REQUIRED),
      })
      .refine((value) => /^\d+$/.test(value), {
        message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_INVALID),
      }),
    type: z.enum(['MOBILE', 'HOME', 'WORK', 'OTHER']).default('MOBILE'),
    isPrimary: z.boolean().default(false),
  })
  .refine(
    (data) => {
      const fullDialingCode = data.dialingCode;
      const isValid = phoneNumberValidator(fullDialingCode, data.number);
      return isValid;
    },
    {
      message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_INVALID),
      path: ['number'],
    }
  );
