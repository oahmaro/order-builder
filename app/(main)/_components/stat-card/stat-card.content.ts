// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum StatCardPhrases {
  VIEW_ALL = 'view-all',
}

export const statCardContent = new Polyglot({
  locale: 'en',
  phrases: {
    [StatCardPhrases.VIEW_ALL]: 'צפה בהכל',
  },
});
