// spell-checker:disable

import Polyglot from 'node-polyglot';

export enum MediaCaptureContentPhrases {
  ERROR = 'error',
  CANCEL = 'cancel',
  CAPTURE = 'capture',
  TAKE_PHOTO = 'take-photo',
  UPLOAD_IMAGE = 'upload-image',
  ERROR_TAKING_PHOTO = 'error-taking-photo',
  ERROR_UPLOADING_IMAGE = 'error-uploading-image',
  ERROR_ACCESSING_CAMERA = 'error-accessing-camera',
  SWITCH_CAMERA = 'switch-camera',
  UPLOADING = 'uploading',
}

export const mediaCaptureContent = new Polyglot({
  locale: 'he',
  phrases: {
    [MediaCaptureContentPhrases.ERROR]: 'שגיאה',
    [MediaCaptureContentPhrases.CANCEL]: 'ביטול',
    [MediaCaptureContentPhrases.CAPTURE]: 'צילום',
    [MediaCaptureContentPhrases.TAKE_PHOTO]: 'צילום',
    [MediaCaptureContentPhrases.UPLOAD_IMAGE]: 'העלאה תמונה',
    [MediaCaptureContentPhrases.ERROR_TAKING_PHOTO]: 'לא ניתן לצלם',
    [MediaCaptureContentPhrases.ERROR_UPLOADING_IMAGE]: 'לא ניתן להעלות תמונה',
    [MediaCaptureContentPhrases.ERROR_ACCESSING_CAMERA]: 'לא ניתן לגשת למצלמה',
    [MediaCaptureContentPhrases.UPLOADING]: 'מעלה...',
    [MediaCaptureContentPhrases.SWITCH_CAMERA]: 'החלף מצלמה',
  },
});
