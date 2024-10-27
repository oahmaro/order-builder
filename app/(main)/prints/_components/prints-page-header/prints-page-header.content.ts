// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PrintsPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
  DELETE_MODAL_TITLE = 'delete-modal-title',
  DELETE_MODAL_CONTENT = 'delete-modal-content',
  DELETE_MODAL_CONFIRM = 'delete-modal-confirm',
  DELETE_MODAL_CANCEL = 'delete-modal-cancel',
  PRINT_DELETED = 'print-deleted',
  DELETE_ACTION = 'delete-action',
  SAVE_ACTION = 'save-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
}

export const printsPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PrintsPageHeaderPhrases.TITLE]: 'הדפסות',
    [PrintsPageHeaderPhrases.SUBTITLE]: '%{smart_count} הדפסה |||| %{smart_count} הדפסות',
    [PrintsPageHeaderPhrases.ACTION]: 'הוסף הדפסה חדשה',
    [PrintsPageHeaderPhrases.MODAL_TITLE]: 'הוסף הדפסה חדשה',
    [PrintsPageHeaderPhrases.DELETE_MODAL_TITLE]: 'מחיקת הדפסה',
    [PrintsPageHeaderPhrases.DELETE_MODAL_CONTENT]: 'האם אתה בטוח שברצונך למחוק הדפסה זו?',
    [PrintsPageHeaderPhrases.DELETE_MODAL_CONFIRM]: 'מחק',
    [PrintsPageHeaderPhrases.DELETE_MODAL_CANCEL]: 'בטל',
    [PrintsPageHeaderPhrases.PRINT_DELETED]: 'ההדפסה נמחקה בהצלחה',
    [PrintsPageHeaderPhrases.DELETE_ACTION]: 'מחק',
    [PrintsPageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [PrintsPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'הדפסה זו משויכת לפריטי מכירה',
    [PrintsPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'אין שינויים לשמירה',
  },
});
