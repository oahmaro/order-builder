// spell-checker: disable

import Polyglot from 'node-polyglot';

export enum CommonPhrases {
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  SAVE = 'save',
  CANCEL = 'cancel',
  CLOSE = 'close',
  CONFIRM = 'confirm',
  YES = 'yes',
  NO = 'no',
  OK = 'ok',
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  SUBMIT = 'submit',
  UPLOAD_FAILED = 'upload-failed',
}

export const commonContent = new Polyglot({
  locale: 'he',
  phrases: {
    [CommonPhrases.CREATE]: 'צור',
    [CommonPhrases.EDIT]: 'ערוך',
    [CommonPhrases.DELETE]: 'מחק',
    [CommonPhrases.SAVE]: 'שמור',
    [CommonPhrases.CANCEL]: 'בטל',
    [CommonPhrases.CLOSE]: 'סגור',
    [CommonPhrases.CONFIRM]: 'אישור',
    [CommonPhrases.YES]: 'כן',
    [CommonPhrases.NO]: 'לא',
    [CommonPhrases.OK]: 'אישור',
    [CommonPhrases.ERROR]: 'שגיאה',
    [CommonPhrases.SUCCESS]: 'הצלחה',
    [CommonPhrases.WARNING]: 'אזהרה',
    [CommonPhrases.INFO]: 'מידע',
    [CommonPhrases.SUBMIT]: 'שליחה',
    [CommonPhrases.UPLOAD_FAILED]: 'העלאת התמונה נכשלה',
  },
});
