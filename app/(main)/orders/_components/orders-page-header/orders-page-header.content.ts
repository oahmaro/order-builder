// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum OrderPageHeaderPhrases {
  TITLE = 'title',
  ACTION = 'action',
  SUBTITLE = 'subtitle',
}

export const orderPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [OrderPageHeaderPhrases.TITLE]: 'הזמנות',
    [OrderPageHeaderPhrases.ACTION]: 'צור ערך חדש',
    [OrderPageHeaderPhrases.SUBTITLE]: '%{smart_count} הזמנה |||| %{smart_count} הזמנות',
  },
});
