import Polyglot from 'node-polyglot';

export enum CreateCustomerFormContentPhrases {
  FIRST_NAME_LABEL = 'first-name-label',
  FIRST_NAME_REQUIRED = 'first-name-required',

  LAST_NAME_LABEL = 'last-name-label',
  LAST_NAME_REQUIRED = 'last-name-required',

  PHONE_NUMBER_LABEL = 'phone-number-label',
  PHONE_NUMBER_REQUIRED = 'phone-number-required',
  PHONE_NUMBER_INVALID = 'phone-number-invalid',

  EMAIL_LABEL = 'email-label',
  EMAIL_INVALID = 'email-invalid',

  DATE_OF_BIRTH_LABEL = 'date-of-birth-label',
  DATE_OF_BIRTH_INVALID = 'date-of-birth-invalid',
}

export const createCustomerFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CreateCustomerFormContentPhrases.FIRST_NAME_LABEL]: 'שם פרטי',
    [CreateCustomerFormContentPhrases.FIRST_NAME_REQUIRED]: 'השם נדרש',

    [CreateCustomerFormContentPhrases.LAST_NAME_LABEL]: 'שם משפחה',
    [CreateCustomerFormContentPhrases.LAST_NAME_REQUIRED]: 'שם משפחה נדרש',

    [CreateCustomerFormContentPhrases.PHONE_NUMBER_LABEL]: 'מספר טלפון',
    [CreateCustomerFormContentPhrases.PHONE_NUMBER_REQUIRED]: 'מספר טלפון נדרש',
    [CreateCustomerFormContentPhrases.PHONE_NUMBER_INVALID]: 'מספר טלפון לא חוקי',

    [CreateCustomerFormContentPhrases.EMAIL_LABEL]: 'דוא"ל',
    [CreateCustomerFormContentPhrases.EMAIL_INVALID]: 'כתובת דוא"ל לא חוקית',

    [CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL]: 'תאריך לידה',
    [CreateCustomerFormContentPhrases.DATE_OF_BIRTH_INVALID]: 'תאריך לידה לא חוקי',
  },
});
