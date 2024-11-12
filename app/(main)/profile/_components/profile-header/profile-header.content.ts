// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum ProfileHeaderContentPhrases {
  SAVE = 'save',
}

export const profileHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [ProfileHeaderContentPhrases.SAVE]: 'להציל',
  },
});
