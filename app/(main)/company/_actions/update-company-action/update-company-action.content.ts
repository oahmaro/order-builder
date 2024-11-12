// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UpdateCompanyActionContentPhrases {
  COMPANY_UPDATED = 'company-updated',
  FORM_DATA_INVALID = 'form-data-invalid',
  PHONE_NUMBER_IN_USE = 'phone-number-in-use',
  ERROR_WHILE_UPDATING = 'error-while-updating',
}

export const updateCompanyActionContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UpdateCompanyActionContentPhrases.COMPANY_UPDATED]: 'החברה עודכנה בהצלחה',
    [UpdateCompanyActionContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס שגויים',
    [UpdateCompanyActionContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעת עדכון החברה',
    [UpdateCompanyActionContentPhrases.PHONE_NUMBER_IN_USE]: 'מספר הטלפון כבר בשימוש בחברה אחרת',
  },
});
