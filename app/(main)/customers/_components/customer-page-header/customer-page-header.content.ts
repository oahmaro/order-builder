// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CustomerPageHeaderPhrases {
  ACTION = 'action',
}

export const customerPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomerPageHeaderPhrases.ACTION]: 'שמור',
  },
});
