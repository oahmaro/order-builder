// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FramesPageHeaderPhrases {
  TITLE = 'title',
  ACTION = 'action',
  SUBTITLE = 'subtitle',
  MODAL_TITLE = 'modal-title',
}

export const framesPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FramesPageHeaderPhrases.TITLE]: 'מסגרות',
    [FramesPageHeaderPhrases.ACTION]: 'הוספת מסגרת',
    [FramesPageHeaderPhrases.MODAL_TITLE]: 'צור מסגרת',
    [FramesPageHeaderPhrases.SUBTITLE]: '%{smart_count} מסגרת |||| %{smart_count} מסגרות',
  },
});
