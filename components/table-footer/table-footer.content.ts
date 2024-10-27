// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum TableFooterContentPhrases {
  ITEMS_PER_PAGE = 'items-per-page',
}

export const tableFooterContent = new Polyglot({
  locale: 'he',
  phrases: {
    [TableFooterContentPhrases.ITEMS_PER_PAGE]: 'ערכים לדף',
  },
});
