// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PassepartoutFormContentPhrases {
  NAME = 'name',
  DESCRIPTION = 'description',
  NAME_REQUIRED = 'name-required',
  PASSEPARTOUT_CREATED = 'passepartout-created',
  PASSEPARTOUT_UPDATED = 'passepartout-updated',
  PASSEPARTOUT_DELETED = 'passepartout-deleted',
  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  ERROR_WHILE_UPDATING = 'error-while-updating',
  ERROR_WHILE_DELETING = 'error-while-deleting',
  DELETE_MODAL_TITLE = 'delete-modal-title',
  DELETE_MODAL_CONTENT = 'delete-modal-content',
  DELETE_MODAL_CONFIRM = 'delete-modal-confirm',
  DELETE_MODAL_CANCEL = 'delete-modal-cancel',
  DELETE_ACTION = 'delete-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
}

export const passepartoutFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PassepartoutFormContentPhrases.DESCRIPTION]: 'תיאור',
    [PassepartoutFormContentPhrases.NAME]: 'שם הפסס פרטווט',
    [PassepartoutFormContentPhrases.NAME_REQUIRED]: 'שם הפסס פרטווט הוא שדה חובה',
    [PassepartoutFormContentPhrases.PASSEPARTOUT_CREATED]: 'הפסס פרטווט נוצר',
    [PassepartoutFormContentPhrases.PASSEPARTOUT_UPDATED]: 'הפסס פרטווט עודכן',
    [PassepartoutFormContentPhrases.PASSEPARTOUT_DELETED]: 'הפסס פרטווט נמחק',
    [PassepartoutFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס שגויים',
    [PassepartoutFormContentPhrases.ERROR_WHILE_CREATING]: 'שגיאה ביצירת הפסס פרטווט',
    [PassepartoutFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון הפסס פרטווט',
    [PassepartoutFormContentPhrases.ERROR_WHILE_DELETING]: 'שגיאה במחיקת הפסס פרטווט',
    [PassepartoutFormContentPhrases.DELETE_MODAL_TITLE]: 'מחיקת פסס פרטווט',
    [PassepartoutFormContentPhrases.DELETE_MODAL_CONTENT]:
      'האם אתה בטוח שברצונך למחוק פסס פרטווט זה?',
    [PassepartoutFormContentPhrases.DELETE_MODAL_CONFIRM]: 'מחיקה',
    [PassepartoutFormContentPhrases.DELETE_MODAL_CANCEL]: 'ביטול',
    [PassepartoutFormContentPhrases.DELETE_DISABLED_TOOLTIP]: 'לא ניתן למחוק פסס פרטווט עם פעולות',
    [PassepartoutFormContentPhrases.SAVE_ACTION]: 'שמירה',
    [PassepartoutFormContentPhrases.SAVE_DISABLED_TOOLTIP]:
      'לא ניתן לשמור עדכון פסס פרטווט בלי שינויים',
    [PassepartoutFormContentPhrases.DELETE_ACTION]: 'מחיקה',
  },
});
