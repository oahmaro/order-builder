// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CreatePrintFormContentPhrases {
  NAME_LABEL = 'name-label',
  NAME_REQUIRED = 'name-required',
  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  RECORD_CREATED = 'successfully-created',
}

export const createPrintFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CreatePrintFormContentPhrases.NAME_LABEL]: 'שם',
    [CreatePrintFormContentPhrases.NAME_REQUIRED]: 'השם נדרש',
    [CreatePrintFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס לא חוקיים',
    [CreatePrintFormContentPhrases.ERROR_WHILE_CREATING]: 'אירעה שגיאה ביצירת ההדפסה',
    [CreatePrintFormContentPhrases.RECORD_CREATED]: 'נוצרה הדפסה חדשה',
  },
});
