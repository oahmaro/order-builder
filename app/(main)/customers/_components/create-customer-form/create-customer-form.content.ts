// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CreateCustomerFormContentPhrases {
  FIRST_NAME_LABEL = 'first-name-label',
  FIRST_NAME_REQUIRED = 'first-name-required',

  LAST_NAME_LABEL = 'last-name-label',
  LAST_NAME_REQUIRED = 'last-name-required',

  PHONE_NUMBER_LABEL = 'מספר טלפון',
  PHONE_NUMBER_REQUIRED = 'מספר טלפון נדרש',
  PHONE_NUMBER_INVALID = 'מספר טלפון לא חוקי',

  COUNTRY_CODE_LABEL = 'קוד מדינה',
  COUNTRY_CODE_REQUIRED = 'קוד מדינה נדרש',

  EMAIL_LABEL = 'email-label',
  EMAIL_INVALID = 'email-invalid',

  DATE_OF_BIRTH_LABEL = 'date-of-birth-label',
  DATE_OF_BIRTH_INVALID = 'date-of-birth-invalid',

  REMOVE_PHONE = 'remove-phone',
  PHONE_TYPE_LABEL = 'phoneTypeLabel',
  ADD_PHONE = 'add_phone',

  MOBILE_LABEL = 'mobile-label',
  HOME_LABEL = 'home-label',
  WORK_LABEL = 'work-label',
  OTHER_LABEL = 'other-label',

  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  CUSTOMER_CREATED = 'customer-created',
  PHONE_NUMBER_IN_USE = 'phone-number-in-use',
  NO_VALID_PHONE = 'no-valid-phone',

  COUNTRY_LABEL = 'מדינה',
  COUNTRY_PLACEHOLDER = 'בחר מדינה',
  STREET_ADDRESS_LABEL = 'כתובת רחוב',
  STREET_ADDRESS_PLACEHOLDER = 'הזן את כתובת הרחוב',
  APT_SUITE_LABEL = 'דירה/סוויטה (אופציונלי)',
  APT_SUITE_PLACEHOLDER = 'הזן מספר דירה או סוויטה',
  CITY_LABEL = 'עיר',
  CITY_PLACEHOLDER = 'הזן את שם העיר',
  STATE_PROVINCE_LABEL = 'מדינה / מחוז / אזור',
  STATE_PROVINCE_PLACEHOLDER = 'הזן מדינה, מחוז או אזור',
  POSTAL_CODE_LABEL = 'מיקוד',
  POSTAL_CODE_PLACEHOLDER = 'הזן מיקוד',

  ADDITIONAL_INFORMATION_LABEL = 'מידע נוסף',
  ADDRESS_LABEL = 'כתובת',
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

    [CreateCustomerFormContentPhrases.COUNTRY_CODE_LABEL]: 'קוד מדינה',
    [CreateCustomerFormContentPhrases.COUNTRY_CODE_REQUIRED]: 'קוד מדינה נדרש',

    [CreateCustomerFormContentPhrases.EMAIL_LABEL]: 'דוא"ל',
    [CreateCustomerFormContentPhrases.EMAIL_INVALID]: 'כתובת דוא"ל לא חוקית',

    [CreateCustomerFormContentPhrases.DATE_OF_BIRTH_LABEL]: 'תאריך לידה',
    [CreateCustomerFormContentPhrases.DATE_OF_BIRTH_INVALID]: 'תאריך לידה לא חוקי',

    [CreateCustomerFormContentPhrases.REMOVE_PHONE]: 'הסר',
    [CreateCustomerFormContentPhrases.PHONE_TYPE_LABEL]: 'סוג',
    [CreateCustomerFormContentPhrases.ADD_PHONE]: 'הוסף מספר טלפון',
    [CreateCustomerFormContentPhrases.MOBILE_LABEL]: 'נייד',
    [CreateCustomerFormContentPhrases.HOME_LABEL]: 'בית',
    [CreateCustomerFormContentPhrases.WORK_LABEL]: 'עבודה',
    [CreateCustomerFormContentPhrases.OTHER_LABEL]: 'אחר',

    [CreateCustomerFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס לא חוקיים',
    [CreateCustomerFormContentPhrases.ERROR_WHILE_CREATING]: 'אירעה שגיאה ביצירת הלקוח',
    [CreateCustomerFormContentPhrases.CUSTOMER_CREATED]: 'נוצר לקוח חדש',
    [CreateCustomerFormContentPhrases.PHONE_NUMBER_IN_USE]: 'מספר הטלפון כבר בשימוש',

    [CreateCustomerFormContentPhrases.NO_VALID_PHONE]: 'נדרש לפחות מספר טלפון אחד תקין',

    [CreateCustomerFormContentPhrases.COUNTRY_LABEL]: 'מדינה',
    [CreateCustomerFormContentPhrases.COUNTRY_PLACEHOLDER]: 'בחר מדינה',
    [CreateCustomerFormContentPhrases.STREET_ADDRESS_LABEL]: 'כתובת רחוב',
    [CreateCustomerFormContentPhrases.STREET_ADDRESS_PLACEHOLDER]: 'הזן את כתובת הרחוב',
    [CreateCustomerFormContentPhrases.APT_SUITE_LABEL]: 'דירה/סויטה (אופציונלי)',
    [CreateCustomerFormContentPhrases.APT_SUITE_PLACEHOLDER]: 'הזן מספר דירה או סויטה',
    [CreateCustomerFormContentPhrases.CITY_LABEL]: 'עיר',
    [CreateCustomerFormContentPhrases.CITY_PLACEHOLDER]: 'הזן את שם העיר',
    [CreateCustomerFormContentPhrases.STATE_PROVINCE_LABEL]: 'מדינה / מחוז / אזור',
    [CreateCustomerFormContentPhrases.STATE_PROVINCE_PLACEHOLDER]: 'הזן מדינה, מחוז או אזור',
    [CreateCustomerFormContentPhrases.POSTAL_CODE_LABEL]: 'מיקוד',
    [CreateCustomerFormContentPhrases.POSTAL_CODE_PLACEHOLDER]: 'הזן מיקוד',

    [CreateCustomerFormContentPhrases.ADDITIONAL_INFORMATION_LABEL]: 'מידע נוסף',
    [CreateCustomerFormContentPhrases.ADDRESS_LABEL]: 'כתובת',
  },
});
