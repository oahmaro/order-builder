'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

import { passepartoutFormSchema } from '../_components/passepartout-form/passepartout-form.schema';

import {
  passepartoutFormContent,
  PassepartoutFormContentPhrases,
} from '../_components/passepartout-form/passepartout-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updatePassepartoutAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const passepartoutId = parseInt(formData.passepartoutId as string, 10);

  const parsed = passepartoutFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, description } = parsed.data;

  try {
    await db.passepartout.update({
      where: { id: passepartoutId },
      data: { name, description },
    });

    revalidatePath('/passepartout');

    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.PASSEPARTOUT_UPDATED),
    };
  } catch (error) {
    return {
      message: passepartoutFormContent.t(PassepartoutFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
