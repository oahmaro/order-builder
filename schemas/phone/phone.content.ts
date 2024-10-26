// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PhoneContentPhrases {
  COUNTRY_CODE_REQUIRED = 'country-code-required',
  COUNTRY_CODE_INVALID = 'country-code-invalid',
  PHONE_NUMBER_REQUIRED = 'phone-number-required',
  PHONE_NUMBER_INVALID = 'phone-number-invalid',
  DIALING_CODE_REQUIRED = 'DIALING_CODE_REQUIRED',
}

export const phoneContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PhoneContentPhrases.COUNTRY_CODE_REQUIRED]: 'קוד מדינה נדרש',
    [PhoneContentPhrases.COUNTRY_CODE_INVALID]: 'קוד מדינה לא חוקי',
    [PhoneContentPhrases.DIALING_CODE_REQUIRED]: 'קוד ניתוק נדרש',
    [PhoneContentPhrases.PHONE_NUMBER_REQUIRED]: 'מספר טלפון נדרש',
    [PhoneContentPhrases.PHONE_NUMBER_INVALID]: 'מספר טלפון לא חוקי',
  },
});
