// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CustomerFormContentPhrases {
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

export const customerFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomerFormContentPhrases.FIRST_NAME_LABEL]: 'שם פרטי',
    [CustomerFormContentPhrases.FIRST_NAME_REQUIRED]: 'השם נדרש',

    [CustomerFormContentPhrases.LAST_NAME_LABEL]: 'שם משפחה',
    [CustomerFormContentPhrases.LAST_NAME_REQUIRED]: 'שם משפחה נדרש',

    [CustomerFormContentPhrases.PHONE_NUMBER_LABEL]: 'מספר טלפון',
    [CustomerFormContentPhrases.PHONE_NUMBER_REQUIRED]: 'מספר טלפון נדרש',
    [CustomerFormContentPhrases.PHONE_NUMBER_INVALID]: 'מספר טלפון לא חוקי',

    [CustomerFormContentPhrases.COUNTRY_CODE_LABEL]: 'קוד מדינה',
    [CustomerFormContentPhrases.COUNTRY_CODE_REQUIRED]: 'קוד מדינה נדרש',

    [CustomerFormContentPhrases.EMAIL_LABEL]: 'דוא"ל',
    [CustomerFormContentPhrases.EMAIL_INVALID]: 'כתובת דוא"ל לא חוקית',

    [CustomerFormContentPhrases.DATE_OF_BIRTH_LABEL]: 'תאריך לידה',
    [CustomerFormContentPhrases.DATE_OF_BIRTH_INVALID]: 'תאריך לידה לא חוקי',

    [CustomerFormContentPhrases.REMOVE_PHONE]: 'הסר',
    [CustomerFormContentPhrases.PHONE_TYPE_LABEL]: 'סוג',
    [CustomerFormContentPhrases.ADD_PHONE]: 'הוסף מספר טלפון',
    [CustomerFormContentPhrases.MOBILE_LABEL]: 'נייד',
    [CustomerFormContentPhrases.HOME_LABEL]: 'בית',
    [CustomerFormContentPhrases.WORK_LABEL]: 'עבודה',
    [CustomerFormContentPhrases.OTHER_LABEL]: 'אחר',

    [CustomerFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס לא חוקיים',
    [CustomerFormContentPhrases.ERROR_WHILE_CREATING]: 'אירעה שגיאה ביצירת הלקוח',
    [CustomerFormContentPhrases.CUSTOMER_CREATED]: 'נוצר לקוח חדש',
    [CustomerFormContentPhrases.PHONE_NUMBER_IN_USE]: 'מספר הטלפון כבר בשימוש',

    [CustomerFormContentPhrases.NO_VALID_PHONE]: 'נדרש לפחות מספר טלפון אחד תקין',

    [CustomerFormContentPhrases.COUNTRY_LABEL]: 'מדינה',
    [CustomerFormContentPhrases.COUNTRY_PLACEHOLDER]: 'בחר מדינה',
    [CustomerFormContentPhrases.STREET_ADDRESS_LABEL]: 'כתובת רחוב',
    [CustomerFormContentPhrases.STREET_ADDRESS_PLACEHOLDER]: 'הזן את כתובת הרחוב',
    [CustomerFormContentPhrases.APT_SUITE_LABEL]: 'דירה/סויטה (אופציונלי)',
    [CustomerFormContentPhrases.APT_SUITE_PLACEHOLDER]: 'הזן מספר דירה או סויטה',
    [CustomerFormContentPhrases.CITY_LABEL]: 'עיר',
    [CustomerFormContentPhrases.CITY_PLACEHOLDER]: 'הזן את שם העיר',
    [CustomerFormContentPhrases.STATE_PROVINCE_LABEL]: 'מדינה / מחוז / אזור',
    [CustomerFormContentPhrases.STATE_PROVINCE_PLACEHOLDER]: 'הזן מדינה, מחוז או אזור',
    [CustomerFormContentPhrases.POSTAL_CODE_LABEL]: 'מיקוד',
    [CustomerFormContentPhrases.POSTAL_CODE_PLACEHOLDER]: 'הזן מיקוד',

    [CustomerFormContentPhrases.ADDITIONAL_INFORMATION_LABEL]: 'מידע נוסף',
    [CustomerFormContentPhrases.ADDRESS_LABEL]: 'כתובת',
  },
});
