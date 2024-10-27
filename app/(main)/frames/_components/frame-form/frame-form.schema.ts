import { z } from 'zod';

import { frameFormContent, FrameFormContentPhrases } from './frame-form.content';

export const frameFormSchema = z.object({
  name: z.string().min(1, { message: frameFormContent.t(FrameFormContentPhrases.NAME_REQUIRED) }),
  description: z.string().optional(),
});
