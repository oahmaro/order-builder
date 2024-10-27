// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UserPageHeaderPhrases {
  USER_DELETED = 'user-deleted',
  MODAL_TITLE = 'modal-title',
  MODAL_CONTENT = 'modal-content',
  MODAL_CONFIRM = 'modal-confirm',
  DELETE_ACTION = 'delete-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
}

export const userPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UserPageHeaderPhrases.USER_DELETED]: 'משתמש נמחק',
    [UserPageHeaderPhrases.MODAL_TITLE]: 'האם אתה בטוח שברצונך למחוק משתמש?',
    [UserPageHeaderPhrases.MODAL_CONTENT]: 'האם אתה בטוח שברצונך למחוק משתמש?',
    [UserPageHeaderPhrases.MODAL_CONFIRM]: 'מחק',
    [UserPageHeaderPhrases.DELETE_ACTION]: 'מחק משתמש',
    [UserPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'לא ניתן למחוק משתמש שהוא משתמש של מערכת',
    [UserPageHeaderPhrases.SAVE_ACTION]: 'שמור משתמש',
    [UserPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'לא ניתן לשמור משתמש שלא שונה',
  },
});
