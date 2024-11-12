// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum ChangePasswordCardContentPhrases {
  TITLE = 'title',
  CURRENT_PASSWORD = 'current-password',
  NEW_PASSWORD = 'new-password',
  CONFIRM_PASSWORD = 'confirm-password',
}

export const changePasswordCardContent = new Polyglot({
  locale: 'he',
  phrases: {
    [ChangePasswordCardContentPhrases.TITLE]: 'שנה סיסמא',
    [ChangePasswordCardContentPhrases.CURRENT_PASSWORD]: 'סיסמה נוכחית',
    [ChangePasswordCardContentPhrases.NEW_PASSWORD]: 'סיסמה חדשה',
    [ChangePasswordCardContentPhrases.CONFIRM_PASSWORD]: 'אשר סיסמה',
  },
});
