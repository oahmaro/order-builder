// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AdhesionFormContentPhrases {
  NAME = 'name',
  NAME_REQUIRED = 'name-required',

  DESCRIPTION = 'description',

  FORM_DATA_INVALID = 'form-data-invalid',
  ERROR_WHILE_CREATING = 'error-while-creating',
  ADHESION_CREATED = 'adhesion-created',
  ADHESION_DELETED = 'adhesion-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',

  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',

  DELETE_ACTION = 'delete-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',

  CANCEL_ACTION = 'cancel-action',

  UPDATE_ACTION = 'update-action',
  UPDATE_DISABLED_TOOLTIP = 'update-disabled-tooltip',
  ADHESION_UPDATED = 'adhesion-updated',
  ERROR_WHILE_UPDATING = 'error-while-updating',
}

export const adhesionFormContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AdhesionFormContentPhrases.NAME]: 'שם ההדיסיון',
    [AdhesionFormContentPhrases.NAME_REQUIRED]: 'שם ההדיסיון נדרש',

    [AdhesionFormContentPhrases.DESCRIPTION]: 'תיאור ההדיסיון',

    [AdhesionFormContentPhrases.FORM_DATA_INVALID]: 'נתוני הטופס שגויים',
    [AdhesionFormContentPhrases.ERROR_WHILE_CREATING]: 'שגיאה ביצירת ההדיסיון',
    [AdhesionFormContentPhrases.ADHESION_CREATED]: 'ההדיסיון נוצר בהצלחה',
    [AdhesionFormContentPhrases.ADHESION_DELETED]: 'ההדיסיון נמחק בהצלחה',
    [AdhesionFormContentPhrases.ERROR_WHILE_DELETING]: 'שגיאה במחיקת ההדיסיון',

    [AdhesionFormContentPhrases.SAVE_ACTION]: 'שמור',
    [AdhesionFormContentPhrases.SAVE_DISABLED_TOOLTIP]: 'הטופס חייב להכיל נתונים',

    [AdhesionFormContentPhrases.DELETE_ACTION]: 'מחק',
    [AdhesionFormContentPhrases.DELETE_DISABLED_TOOLTIP]: 'ההדיסיון נמצא בהזמנות',

    [AdhesionFormContentPhrases.CANCEL_ACTION]: 'בטל',

    [AdhesionFormContentPhrases.UPDATE_ACTION]: 'עדכן',
    [AdhesionFormContentPhrases.UPDATE_DISABLED_TOOLTIP]: 'הטופס חייב להכיל נתונים',
    [AdhesionFormContentPhrases.ADHESION_UPDATED]: 'ההדיסיון נעדכן בהצלחה',
    [AdhesionFormContentPhrases.ERROR_WHILE_UPDATING]: 'שגיאה בעדכון ההדיסיון',
  },
});
