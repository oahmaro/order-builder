// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum HeaderLogoPhrases {
  TITLE = 'title',
}

export const headerLogoContent = new Polyglot({
  locale: 'he',
  phrases: {
    [HeaderLogoPhrases.TITLE]: 'אמנות',
  },
});
