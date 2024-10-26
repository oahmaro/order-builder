// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CustomerPageHeaderPhrases {
  SAVE_ACTION = 'save-action',
  DELETE_ACTION = 'delete-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  DELETE_MODAL_TITLE = 'delete-modal-title',
  DELETE_MODAL_CONTENT = 'delete-modal-content',
  DELETE_MODAL_CONFIRM = 'delete-modal-confirm',
  DELETE_MODAL_CANCEL = 'delete-modal-cancel',
  CUSTOMER_DELETED = 'customer-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',
}

export const customerPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomerPageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [CustomerPageHeaderPhrases.DELETE_ACTION]: 'מחק',
    [CustomerPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'אין שינויים לשמור',
    [CustomerPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'לא ניתן למחוק לקוח עם הזמנות',
    [CustomerPageHeaderPhrases.DELETE_MODAL_TITLE]: 'מחיקת לקוח',
    [CustomerPageHeaderPhrases.DELETE_MODAL_CONTENT]: 'האם אתם בטוח שברצונכם למחוק לקוח זה?',
    [CustomerPageHeaderPhrases.DELETE_MODAL_CONFIRM]: 'כן, מחק',
    [CustomerPageHeaderPhrases.DELETE_MODAL_CANCEL]: 'ביטול',
    [CustomerPageHeaderPhrases.CUSTOMER_DELETED]: 'לקוח נמחק בהצלחה',
    [CustomerPageHeaderPhrases.ERROR_WHILE_DELETING]: 'שגיאה בזמן מחיקת לקוח',
  },
});
