import Polyglot from 'node-polyglot';

export enum UsersPageHeaderPhrase {
  TITLE = 'title',
  SUBTITLE = 'subtitle',
  ACTION = 'action',
}

export const usersPageHeaderContent = new Polyglot({
  locale: 'he',
  phrases: {
    [UsersPageHeaderPhrase.TITLE]: 'משתמשים',
    [UsersPageHeaderPhrase.SUBTITLE]: '%{smart_count} משתמש |||| %{smart_count} משתמשים',
    [UsersPageHeaderPhrase.ACTION]: 'הזמן משתמש חדש',
  },
});
