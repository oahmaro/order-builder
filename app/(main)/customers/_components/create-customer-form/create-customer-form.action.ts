'use server';

import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

import { db } from '@/lib/db';
import { createCustomerFormSchema } from './create-customer-form.schema';

import {
  createCustomerFormContent,
  CreateCustomerFormContentPhrases,
} from './create-customer-form.content';

export type FormState = {
  message: string;
  errors?: any[];
};

export async function createCustomerFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedPhones = JSON.parse(formData.phones as string);

  const parsed = createCustomerFormSchema.safeParse({
    ...formData,
    phones: parsedPhones.map((phone: any) => ({
      ...phone,
      countryCode: phone.countryCode.startsWith('+') ? phone.countryCode : `+${phone.countryCode}`,
    })),
  });

  if (!parsed.success) {
    return {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { firstName, lastName, phones, email, dateOfBirth } = parsed.data;

  try {
    await db.customer.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        dateOfBirth: dateOfBirth || null,
        createdById: null,
        updatedById: null,
        addressId: null,
        phones: {
          create: phones.map((phone: any) => ({
            countryCode: phone.countryCode,
            number: phone.number,
            type: phone.type,
            isPrimary: phone.isPrimary,
          })),
        },
      },
    });

    revalidatePath('/customers');

    return {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.CUSTOMER_CREATED),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.PHONE_NUMBER_IN_USE),
      };
    }
    return {
      message: createCustomerFormContent.t(CreateCustomerFormContentPhrases.ERROR_WHILE_CREATING),
    };
  }
}
