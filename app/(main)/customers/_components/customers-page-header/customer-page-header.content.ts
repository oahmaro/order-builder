// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CustomersPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
}

export const customersPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CustomersPageHeaderPhrases.TITLE]: 'לקוחות',
    [CustomersPageHeaderPhrases.SUBTITLE]: '%{smart_count} לקוח |||| %{smart_count} לקוחות',
    [CustomersPageHeaderPhrases.ACTION]: 'הוסף לקוח חדש',
    [CustomersPageHeaderPhrases.MODAL_TITLE]: 'הוסף לקוח חדש',
  },
});
