import { z } from 'zod';
import { CountryCode } from 'libphonenumber-js';

import { phoneNumberValidator } from '@/utils';
import { phoneContent, PhoneContentPhrases } from './phone.content';

export const phoneSchema = z
  .object({
    countryCode: z
      .string()
      .trim()
      .min(1, {
        message: phoneContent.t(PhoneContentPhrases.COUNTRY_CODE_REQUIRED),
      })
      .regex(/^[A-Z]{2}:\+\d{1,4}$/, {
        message: phoneContent.t(PhoneContentPhrases.COUNTRY_CODE_INVALID),
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
  .refine((data) => phoneNumberValidator(data.countryCode as CountryCode, data.number), {
    message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_INVALID),
    path: ['number'],
  });
