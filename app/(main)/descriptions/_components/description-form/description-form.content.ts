// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum DescriptionFormContentPhrases {
  NAME = 'name',
  NAME_REQUIRED = 'name-required',

  DESCRIPTION = 'description',
  DESCRIPTION_REQUIRED = 'description-required',

  FRAME_DETAILS = 'frame-details',

  DESCRIPTION_CREATED = 'description-created',

  ERROR_WHILE_CREATING = 'error-while-creating',

  FORM_DATA_INVALID = 'form-data-invalid',

  DESCRIPTION_DELETED = 'description-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',

  ERROR_WHILE_UPDATING = 'error-while-updating',

  DESCRIPTION_UPDATED = 'description-updated',
}

export const descriptionFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [DescriptionFormContentPhrases.NAME]: 'שם',
    [DescriptionFormContentPhrases.NAME_REQUIRED]: 'שם נדרש',

    [DescriptionFormContentPhrases.DESCRIPTION]: 'תיאור',
    [DescriptionFormContentPhrases.DESCRIPTION_REQUIRED]: 'תיאור נדרש',

    [DescriptionFormContentPhrases.FRAME_DETAILS]: 'פרטי שער',

    [DescriptionFormContentPhrases.DESCRIPTION_CREATED]: 'תיאור נוצר',

    [DescriptionFormContentPhrases.ERROR_WHILE_CREATING]: 'שגיאה ביצירת התיאור',

    [DescriptionFormContentPhrases.FORM_DATA_INVALID]: 'נתונים שגויים',

    [DescriptionFormContentPhrases.DESCRIPTION_DELETED]: 'תיאור נמחק',
    [DescriptionFormContentPhrases.ERROR_WHILE_DELETING]: 'שגיאה במחיקת התיאור',

    [DescriptionFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון התיאור',

    [DescriptionFormContentPhrases.DESCRIPTION_UPDATED]: 'תיאור עודכן',
  },
});
