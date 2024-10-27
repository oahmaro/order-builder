// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum DescriptionPageHeaderPhrases {
  DESCRIPTION_DELETED = 'description-deleted',
  MODAL_TITLE = 'modal-title',
  MODAL_CONTENT = 'modal-content',
  MODAL_CONFIRM = 'modal-confirm',
  DELETE_ACTION = 'delete-action',
  DELETE_DISABLED_TOOLTIP = 'delete-disabled-tooltip',
  SAVE_ACTION = 'save-action',
  SAVE_DISABLED_TOOLTIP = 'save-disabled-tooltip',
}

export const descriptionPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [DescriptionPageHeaderPhrases.DESCRIPTION_DELETED]: 'תיאור נמחק',
    [DescriptionPageHeaderPhrases.MODAL_TITLE]: 'האם אתה בטוח שברצונך למחוק תיאור זה?',
    [DescriptionPageHeaderPhrases.MODAL_CONTENT]: 'האם אתה בטוח שברצונך למחוק תיאור זה?',
    [DescriptionPageHeaderPhrases.MODAL_CONFIRM]: 'מחק',
    [DescriptionPageHeaderPhrases.DELETE_ACTION]: 'מחק תיאור',
    [DescriptionPageHeaderPhrases.DELETE_DISABLED_TOOLTIP]:
      'לא ניתן למחוק תיאור שהוא משומש בפריטי מכירה',
    [DescriptionPageHeaderPhrases.SAVE_ACTION]: 'שמור תיאור',
    [DescriptionPageHeaderPhrases.SAVE_DISABLED_TOOLTIP]: 'לא ניתן לשמור תיאור שלא שונה',
  },
});
