// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum PassepartoutsPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  DELETE_MODAL_TITLE = 'deleteModalTitle',
  DELETE_MODAL_CONTENT = 'deleteModalContent',
  DELETE_MODAL_CONFIRM = 'deleteModalConfirm',
  DELETE_MODAL_CANCEL = 'deleteModalCancel',
  PASSEPARTOUT_DELETED = 'passepartoutDeleted',
  SAVE_ACTION = 'saveAction',
  SAVE_DISABLED_TOOLTIP = 'saveDisabledTooltip',
  DELETE_DISABLED_TOOLTIP = 'deleteDisabledTooltip',
  DELETE_ACTION = 'deleteAction',
  MODAL_TITLE = 'modalTitle',
}

export const passepartoutsPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PassepartoutsPageHeaderPhrases.TITLE]: 'פספרתות',
    [PassepartoutsPageHeaderPhrases.ACTION]: 'הוסף פספרת חדשה',
    [PassepartoutsPageHeaderPhrases.SUBTITLE]: '%{smart_count} פספרת |||| %{smart_count} פספרות',
    [PassepartoutsPageHeaderPhrases.DELETE_MODAL_TITLE]: 'מחיקת פספרת',
    [PassepartoutsPageHeaderPhrases.DELETE_MODAL_CONTENT]: 'האם אתה בטוח שברצונך למחוק פספרת זו?',
    [PassepartoutsPageHeaderPhrases.DELETE_MODAL_CONFIRM]: 'מחק',
    [PassepartoutsPageHeaderPhrases.DELETE_MODAL_CANCEL]: 'בטל',
    [PassepartoutsPageHeaderPhrases.PASSEPARTOUT_DELETED]: 'פספרת נמחקה בהצלחה',
    [PassepartoutsPageHeaderPhrases.SAVE_ACTION]: 'שמור',
    [PassepartoutsPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'אין שינויים לשמירה',
    [PassepartoutsPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]: 'יש הזמנות שמשוייכות לפספרת זו',
    [PassepartoutsPageHeaderPhrases.DELETE_ACTION]: 'מחק',
    [PassepartoutsPageHeaderPhrases.MODAL_TITLE]: 'פספרת חדשה',
  },
});
