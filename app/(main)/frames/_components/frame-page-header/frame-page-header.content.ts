// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FramePageHeaderPhrases {
  SAVE_ACTION = 'save-action',
  DELETE_ACTION = 'delete-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  DELETE_MODAL_TITLE = 'delete-modal-title',
  DELETE_MODAL_CONTENT = 'delete-modal-content',
  DELETE_MODAL_CONFIRM = 'delete-modal-confirm',
  DELETE_MODAL_CANCEL = 'delete-modal-cancel',
  FRAME_DELETED = 'frame-deleted',
  ERROR_WHILE_DELETING = 'error-while-deleting',
}

export const framePageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FramePageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [FramePageHeaderPhrases.DELETE_ACTION]: 'מחק',
    [FramePageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'אין שינויים לשמור',
    [FramePageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'לא ניתן למחוק צלחת עם הזמנות',
    [FramePageHeaderPhrases.DELETE_MODAL_TITLE]: 'מחיקת צלחת',
    [FramePageHeaderPhrases.DELETE_MODAL_CONTENT]: 'האם אתם בטוח שברצונכם למחוק צלחת זו?',
    [FramePageHeaderPhrases.DELETE_MODAL_CONFIRM]: 'כן, מחק',
    [FramePageHeaderPhrases.DELETE_MODAL_CANCEL]: 'ביטול',
    [FramePageHeaderPhrases.FRAME_DELETED]: 'צלחת נמחקה בהצלחה',
    [FramePageHeaderPhrases.ERROR_WHILE_DELETING]: 'שגיאה בזמן מחיקת צלחת',
  },
});
