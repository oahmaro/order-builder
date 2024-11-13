// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum StatCardPhrases {
  VIEW_ALL = 'view-all',
  SHOW_STATS = 'show-stats',
  HIDE_STATS = 'hide-stats',
}

export const statCardContent = new Polyglot({
  locale: 'he',
  phrases: {
    [StatCardPhrases.VIEW_ALL]: 'צפה בהכל',
    [StatCardPhrases.SHOW_STATS]: 'הצג נתונים',
    [StatCardPhrases.HIDE_STATS]: 'הסתר נתונים',
  },
});
