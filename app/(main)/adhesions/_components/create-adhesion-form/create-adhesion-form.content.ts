// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CreateAdhesionFormContentPhrases {
  NAME_LABEL = 'name-label',
  NAME_REQUIRED = 'name-required',
  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  RECORD_CREATED = 'successfully-created',
}

export const createAdhesionFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CreateAdhesionFormContentPhrases.NAME_LABEL]: 'שם',
    [CreateAdhesionFormContentPhrases.NAME_REQUIRED]: 'השם נדרש',
    [CreateAdhesionFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס לא חוקיים',
    [CreateAdhesionFormContentPhrases.ERROR_WHILE_CREATING]: 'אירעה שגיאה ביצירת ההצמדה',
    [CreateAdhesionFormContentPhrases.RECORD_CREATED]: 'נוצרה הצמדה חדשה',
  },
});
