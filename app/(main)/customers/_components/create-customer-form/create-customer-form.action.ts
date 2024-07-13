'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';

import { createCustomerFormSchema } from './create-customer-form.schema';

export type FormState = {
  message: string;
};

export async function createCustomerFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = createCustomerFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { message: 'נתוני הטופס לא חוקיים' };
  }

  const { firstName, lastName, phoneNumber, email, dateOfBirth } = parsed.data;

  try {
    await db.customer.create({
      data: {
        firstName,
        lastName,
        phone: phoneNumber,
        email: email || null,
        dateOfBirth: dateOfBirth || null,
        createdById: null,
        updatedById: null,
        addressId: null,
      },
    });

    revalidatePath('/customers');

    return { message: 'נוצר לקוח חדש' };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error creating customer:', error);
    return { message: 'אירעה שגיאה ביצירת הלקוח' };
  }
}
