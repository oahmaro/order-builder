// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PageHeaderPhrases {
  BACK = 'back',
}

export const pageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PageHeaderPhrases.BACK]: 'חזור',
  },
});
