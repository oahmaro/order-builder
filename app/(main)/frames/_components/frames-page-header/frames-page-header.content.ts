// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum FramesPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
}

export const framesPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [FramesPageHeaderPhrases.TITLE]: 'מסגרות',
    [FramesPageHeaderPhrases.SUBTITLE]: '%{smart_count} מסגרת |||| %{smart_count} מסגרות',
  },
});
