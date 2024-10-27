// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum UsersPageHeaderPhrases {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
  MODAL_TITLE = 'modal-title',
}

export const usersPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UsersPageHeaderPhrases.TITLE]: 'משתמשים',
    [UsersPageHeaderPhrases.SUBTITLE]: '%{smart_count} משתמש |||| %{smart_count} משתמשים',
    [UsersPageHeaderPhrases.ACTION]: 'הזמן משתמש חדש',
    [UsersPageHeaderPhrases.MODAL_TITLE]: 'הזמן משתמש חדש',
  },
});
