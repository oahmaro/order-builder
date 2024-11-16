// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum MainTableHeaderPhrases {
  SEARCH = 'search',
  COLUMNS = 'columns',
}

export const mainTableHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [MainTableHeaderPhrases.SEARCH]: 'חיפוש',
    [MainTableHeaderPhrases.COLUMNS]: 'עמודות',
  },
});
