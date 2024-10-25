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
  },
});
