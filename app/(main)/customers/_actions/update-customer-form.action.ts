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

export async function updateCustomerFormAction(data: FormData): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsedPhones = JSON.parse(formData.phones as string);
  const parsedAddress = JSON.parse(formData.address as string);
  const customerId = parseInt(formData.customerId as string, 10);

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
        const existingCustomer = await db.customer.findUnique({
          where: { id: customerId },
          include: { address: true },
        });

        if (existingCustomer?.address) {
          await db.address.update({
            where: { id: existingCustomer.address.id },
            data: filteredAddressData,
          });
          addressId = existingCustomer.address.id;
        } else {
          const createdAddress = await db.address.create({
            data: filteredAddressData,
          });
          addressId = createdAddress.id;
        }
      }
    }

    await db.customer.update({
      where: { id: customerId },
      data: {
        firstName,
        lastName,
        email: email || null,
        dateOfBirth: dateOfBirth || null,
        updatedById: null,
        addressId,
        phones: {
          deleteMany: {},
          create: phones.map((phone: any, index: number) => ({
            countryCode: phone.countryCode,
            number: phone.number,
            type: phone.type,
            isPrimary: index === 0,
            dialingCode: phone.dialingCode,
          })),
        },
      },
    });

    revalidatePath('/customers');

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_UPDATED),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        message: customerFormContent.t(CustomerFormContentPhrases.PHONE_NUMBER_IN_USE),
      };
    }

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
