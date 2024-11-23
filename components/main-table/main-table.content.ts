// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum MainTableContentPhrases {
  ACTIONS = 'ACTIONS',
  EMPTY_STATE_TITLE = 'EMPTY_STATE_TITLE',
  EMPTY_STATE_DESCRIPTION = 'EMPTY_STATE_DESCRIPTION',
  PAGINATION_PAGE_SIZE_DESCRIPTION = 'PAGINATION_PAGE_SIZE_DESCRIPTION',
}

export const mainTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [MainTableContentPhrases.ACTIONS]: 'פעולות',
    [MainTableContentPhrases.EMPTY_STATE_TITLE]: 'אין מידע',
    [MainTableContentPhrases.EMPTY_STATE_DESCRIPTION]: 'צור רשומות חדשות',
    [MainTableContentPhrases.PAGINATION_PAGE_SIZE_DESCRIPTION]: 'ערכים לדף',
  },
});
