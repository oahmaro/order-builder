// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AdhesionPageHeaderPhrases {
  DELETE_MODAL_TITLE = 'delete-modal-title',
  DELETE_MODAL_CONTENT = 'delete-modal-content',
  DELETE_MODAL_CONFIRM = 'delete-modal-confirm',
  DELETE_MODAL_CANCEL = 'delete-modal-cancel',
  DELETE_ACTION = 'delete-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  ADHESION_DELETED = 'adhesion-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',
  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
  ADHESION_SAVED = 'adhesion-saved',
  ERROR_WHILE_SAVING = 'error-while-saving',
  CREATE_ADHESION = 'create-adhesion',
}

export const adhesionPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AdhesionPageHeaderPhrases.DELETE_MODAL_TITLE]: 'מחיקת הדיסיון',
    [AdhesionPageHeaderPhrases.DELETE_MODAL_CONTENT]: 'האם אתה בטוח שברצונך למחוק הדיסיון?',
    [AdhesionPageHeaderPhrases.DELETE_MODAL_CONFIRM]: 'מחק',
    [AdhesionPageHeaderPhrases.DELETE_MODAL_CANCEL]: 'ביטול',
    [AdhesionPageHeaderPhrases.DELETE_ACTION]: 'מחק',
    [AdhesionPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'ההדיסיון נמצא בסל פעולות',
    [AdhesionPageHeaderPhrases.ADHESION_DELETED]: 'הדיסיון נמחק בהצלחה',
    [AdhesionPageHeaderPhrases.ERROR_WHILE_DELETING]: 'שגיאה במחיקת הדיסיון',
    [AdhesionPageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [AdhesionPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'הטופס חייב להכיל נתונים',
    [AdhesionPageHeaderPhrases.ADHESION_SAVED]: 'הדיסיון נשמר בהצלחה',
    [AdhesionPageHeaderPhrases.ERROR_WHILE_SAVING]: 'שגיאה בשמירת הדיסיון',
    [AdhesionPageHeaderPhrases.CREATE_ADHESION]: 'צור הדיסיון',
  },
});
