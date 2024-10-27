'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { db } from '@/lib/db';
import { customerFormSchema } from '../_components/customer-form/customer-form.schema';

import {
  customerFormContent,
  CustomerFormContentPhrases,
} from '../_components/customer-form/customer-form.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function createCustomerAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedPhones = JSON.parse(formData.phones as string);
  const parsedAddress = JSON.parse(formData.address as string);

  const parsed = customerFormSchema.safeParse({
    ...formData,
    phones: parsedPhones.map((phone: any, index: number) => ({
      ...phone,
      countryCode: phone.countryCode,
      isPrimary: index === 0,
    })),
    address: parsedAddress,
  });

  if (!parsed.success) {
    return {
      message: customerFormContent.t(CustomerFormContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { firstName, lastName, phones, email, dateOfBirth, address } = parsed.data;

  try {
    let addressId = null;
    if (address && Object.values(address).some(Boolean)) {
      const filteredAddressData = Object.fromEntries(
        Object.entries(address).filter(([, value]) => value !== '')
      );

      if (Object.keys(filteredAddressData).length > 0) {
        const createdAddress = await db.address.create({
          data: filteredAddressData,
        });
        addressId = createdAddress.id;
      }
    }

    await db.customer.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        dateOfBirth: dateOfBirth || null,
        createdById: null,
        updatedById: null,
        addressId,
        phones: {
          create: phones.map((phone: any) => ({
            countryCode: phone.countryCode,
            number: phone.number,
            isPrimary: phone.isPrimary,
            dialingCode: phone.dialingCode,
            type: phone.type,
          })),
        },
      },
    });

    revalidatePath('/customers');

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_CREATED),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        message: customerFormContent.t(CustomerFormContentPhrases.PHONE_NUMBER_IN_USE),
      };
    }

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_CREATING),
    };
  }
}
