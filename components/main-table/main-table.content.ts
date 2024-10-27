// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum MainTableContentPhrases {
  EMPTY_STATE_TITLE = 'empty-state-title',
  EMPTY_STATE_DESCRIPTION = 'empty-state-description',
  PAGINATION_PAGE_SIZE_DESCRIPTION = 'pagination-page-size-description',
}

export const mainTableContent = new Polyglot({
  locale: 'he',
  phrases: {
    [MainTableContentPhrases.EMPTY_STATE_TITLE]: 'אין מידע',
    [MainTableContentPhrases.EMPTY_STATE_DESCRIPTION]: 'צור רשומות חדשות',
    [MainTableContentPhrases.PAGINATION_PAGE_SIZE_DESCRIPTION]: 'ערכים לדף',
  },
});
