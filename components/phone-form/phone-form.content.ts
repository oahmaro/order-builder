// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum PhoneFormContentPhrases {
  PHONE_NUMBER_LABEL = 'phone-number-label',
  PHONE_NUMBER_PLACEHOLDER = 'phone-number-placeholder',
  PHONE_NUMBER_REQUIRED = 'phone-number-required',
  PHONE_NUMBER_INVALID = 'phone-number-invalid',

  COUNTRY_CODE_LABEL = 'country-code-label',
  COUNTRY_CODE_PLACEHOLDER = 'country-code-placeholder',
  COUNTRY_CODE_REQUIRED = 'country-code-required',
  COUNTRY_CODE_INVALID = 'country-code-invalid',

  PHONE_TYPE_LABEL = 'phone-type-label',
  MOBILE_LABEL = 'mobile-label',
  HOME_LABEL = 'home-label',
  WORK_LABEL = 'work-label',
  OTHER_LABEL = 'other-label',

  ADD_PHONE = 'add-phone',
  REMOVE_PHONE = 'remove-phone',

  DIALING_CODE_REQUIRED = 'dialing-code-required',
}

export const phoneFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PhoneFormContentPhrases.PHONE_NUMBER_LABEL]: 'מספר טלפון',
    [PhoneFormContentPhrases.PHONE_NUMBER_PLACEHOLDER]: 'הזן מספר טלפון',
    [PhoneFormContentPhrases.PHONE_NUMBER_REQUIRED]: 'מספר טלפון נדרש',
    [PhoneFormContentPhrases.PHONE_NUMBER_INVALID]: 'מספר טלפון לא חוקי',

    [PhoneFormContentPhrases.COUNTRY_CODE_LABEL]: 'קוד מדינה',
    [PhoneFormContentPhrases.COUNTRY_CODE_PLACEHOLDER]: '+972',
    [PhoneFormContentPhrases.COUNTRY_CODE_REQUIRED]: 'קוד מדינה נדרש',
    [PhoneFormContentPhrases.COUNTRY_CODE_INVALID]: 'קוד מדינה לא חוקי',

    [PhoneFormContentPhrases.PHONE_TYPE_LABEL]: 'סוג',
    [PhoneFormContentPhrases.MOBILE_LABEL]: 'נייד',
    [PhoneFormContentPhrases.HOME_LABEL]: 'בית',
    [PhoneFormContentPhrases.WORK_LABEL]: 'עבודה',
    [PhoneFormContentPhrases.OTHER_LABEL]: 'אחר',

    [PhoneFormContentPhrases.ADD_PHONE]: 'הוסף מספר טלפון',
    [PhoneFormContentPhrases.REMOVE_PHONE]: 'הסר',

    [PhoneFormContentPhrases.DIALING_CODE_REQUIRED]: 'קוד חיוג נדרש',
  },
});
