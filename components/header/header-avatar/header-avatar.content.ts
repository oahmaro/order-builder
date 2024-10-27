// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum HeaderAvatarPhrases {
  PROFILE = 'profile',
  LOGOUT = 'logout',
}

export const headerAvatarContent = new Polyglot({
  locale: 'he',
  phrases: {
    [HeaderAvatarPhrases.PROFILE]: 'פרופיל',
    [HeaderAvatarPhrases.LOGOUT]: 'להתנתק',
  },
});
