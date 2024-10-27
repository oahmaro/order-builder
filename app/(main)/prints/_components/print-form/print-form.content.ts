// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PrintFormContentPhrases {
  NAME = 'name',
  NAME_REQUIRED = 'name-required',

  DESCRIPTION = 'description',

  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  PRINT_CREATED = 'print-created',
  ERROR_WHILE_DELETING = 'error-while-deleting',
  PRINT_DELETED = 'print-deleted',
  ERROR_WHILE_UPDATING = 'error-while-updating',
  PRINT_UPDATED = 'print-updated',
}

export const printFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PrintFormContentPhrases.NAME]: 'שם הפריסה',
    [PrintFormContentPhrases.NAME_REQUIRED]: 'שם הפריסה הוא שדה חובה',

    [PrintFormContentPhrases.DESCRIPTION]: 'תיאור',
    [PrintFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס שגויים',
    [PrintFormContentPhrases.ERROR_WHILE_CREATING]: 'שגיאה ביצירת הפריסה',
    [PrintFormContentPhrases.PRINT_CREATED]: 'הפריסה נוצרה בהצלחה',

    [PrintFormContentPhrases.ERROR_WHILE_DELETING]: 'שגיאה במחיקת הפריסה',
    [PrintFormContentPhrases.PRINT_DELETED]: 'הפריסה נמחקה בהצלחה',
    [PrintFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון הפריסה',
    [PrintFormContentPhrases.PRINT_UPDATED]: 'הפריסה עודכנה בהצלחה',
  },
});
