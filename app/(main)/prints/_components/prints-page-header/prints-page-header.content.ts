// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum PrintsPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
}

export const printsPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [PrintsPageHeaderPhrases.TITLE]: 'הדפסות',
    [PrintsPageHeaderPhrases.SUBTITLE]: '%{smart_count} הדפסה |||| %{smart_count} הדפסות',
    [PrintsPageHeaderPhrases.ACTION]: 'הוסף הדפסה חדשה',
    [PrintsPageHeaderPhrases.MODAL_TITLE]: 'הוסף הדפסה חדשה',
  },
});
