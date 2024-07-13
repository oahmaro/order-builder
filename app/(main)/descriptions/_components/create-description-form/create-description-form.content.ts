// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CreateDescriptionFormContentPhrases {
  NAME_LABEL = 'name-label',
  NAME_REQUIRED = 'name-required',
  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  RECORD_CREATED = 'successfully-created',
}

export const createDescriptionFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CreateDescriptionFormContentPhrases.NAME_LABEL]: 'שם',
    [CreateDescriptionFormContentPhrases.NAME_REQUIRED]: 'השם נדרש',
    [CreateDescriptionFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס לא חוקיים',
    [CreateDescriptionFormContentPhrases.ERROR_WHILE_CREATING]: 'אירעה שגיאה ביצירת הלקוח',
    [CreateDescriptionFormContentPhrases.RECORD_CREATED]: 'נוצר תיאור חדש',
  },
});
