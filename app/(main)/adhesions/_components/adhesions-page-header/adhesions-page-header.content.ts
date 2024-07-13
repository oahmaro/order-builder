// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum AdhesionsPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
}

export const adhesionsPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [AdhesionsPageHeaderPhrases.TITLE]: 'הידבקויות',
    [AdhesionsPageHeaderPhrases.SUBTITLE]: '%{smart_count} הידבקות |||| %{smart_count} הידבקויות',
    [AdhesionsPageHeaderPhrases.ACTION]: 'הוסף הידבקות חדשה',
    [AdhesionsPageHeaderPhrases.MODAL_TITLE]: 'הוסף הידבקות חדשה',
  },
});
