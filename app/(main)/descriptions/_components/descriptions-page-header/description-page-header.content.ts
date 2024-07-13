// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum DescriptionsPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
}

export const descriptionsPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [DescriptionsPageHeaderPhrases.TITLE]: 'תיאורים',
    [DescriptionsPageHeaderPhrases.SUBTITLE]: '%{smart_count} תיאור |||| %{smart_count} תיאורים',
    [DescriptionsPageHeaderPhrases.ACTION]: 'הוסף תיאור חדש',
    [DescriptionsPageHeaderPhrases.MODAL_TITLE]: 'הוסף תיאור חדש',
  },
});
