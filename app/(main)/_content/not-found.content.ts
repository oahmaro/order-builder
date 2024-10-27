// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum NotFoundPagePhrases {
  TITLE = 'title',
  GO_HOME = 'go-home',
}

export const notFoundPageContent = new Polyglot({
  locale: 'he',
  phrases: {
    [NotFoundPagePhrases.TITLE]: 'הדף הזה לא נמצא.',
    [NotFoundPagePhrases.GO_HOME]: 'עבור לעמוד הבית',
  },
});
