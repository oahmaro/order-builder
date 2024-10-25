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
      })
      .transform((value) => {
        const parts = value.split(':');
        return parts.length > 1 ? parts[1] : value;
      })
      .refine(
        (value) => {
          const isValid = /^\+?\d{1,4}$/.test(value);
          return isValid;
        },
        {
          message: phoneContent.t(PhoneContentPhrases.COUNTRY_CODE_INVALID),
        }
      ),
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
      const isValid = phoneNumberValidator(data.countryCode, data.number);
      return isValid;
    },
    {
      message: phoneContent.t(PhoneContentPhrases.PHONE_NUMBER_INVALID),
      path: ['number'],
    }
  );
