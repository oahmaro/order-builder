// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FrameFormContentPhrases {
  FRAME_DETAILS = 'frame-details',
  NAME = 'name',
  NAME_REQUIRED = 'name-required',

  DESCRIPTION = 'description',

  FORM_DATA_INVALID = 'form-data-invalid',
  FRAME_CREATED = 'frame-created',
  ERROR_WHILE_CREATING = 'error-while-creating',

  FRAME_DELETED = 'frame-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',

  FRAME_UPDATED = 'frame-updated',
  ERROR_WHILE_UPDATING = 'error-while-updating',
}

export const frameFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FrameFormContentPhrases.FRAME_DETAILS]: 'פרטי צלחת',

    [FrameFormContentPhrases.NAME]: 'שם הצלחת',
    [FrameFormContentPhrases.NAME_REQUIRED]: 'שם הצלחת נדרש',

    [FrameFormContentPhrases.DESCRIPTION]: 'תיאור הצלחת',

    [FrameFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הצלחת שגויים',
    [FrameFormContentPhrases.FRAME_CREATED]: 'צלחת נוצרה בהצלחה',
    [FrameFormContentPhrases.ERROR_WHILE_CREATING]: 'קרתה שגיאה בעת יצירת הצלחת',

    [FrameFormContentPhrases.FRAME_DELETED]: 'צלחת נמחקה בהצלחה',
    [FrameFormContentPhrases.ERROR_WHILE_DELETING]: 'קרתה שגיאה בעת מחיקת הצלחת',

    [FrameFormContentPhrases.FRAME_UPDATED]: 'צלחת עודכנה בהצלחה',
    [FrameFormContentPhrases.ERROR_WHILE_UPDATING]: 'קרתה שגיאה בעת עדכון הצלחת',
  },
});
