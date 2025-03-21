'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
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
  const session = await auth();

  if (!session?.user?.id) {
    return {
      message: 'Unauthorized',
      errors: ['User must be logged in'],
    };
  }

  const formData = Object.fromEntries(data);
  const parsedPhones = JSON.parse(formData.phones as string);
  const parsedAddress = JSON.parse(formData.address as string);

  const parsed = customerFormSchema.safeParse({
    ...formData,
    phones: parsedPhones.map((phone: any, index: number) => ({
      ...phone,
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

    const customer = await db.customer.create({
      data: {
        firstName,
        lastName,
        email: email || null,
        dateOfBirth: dateOfBirth || null,
        addressId,
        phones: {
          create: phones.map((phone: any) => ({
            number: phone.number,
            isPrimary: phone.isPrimary,
            type: phone.type,
          })),
        },
      },
      include: {
        phones: true,
        address: true,
      },
    });

    // Create audit entry
    await db.audit.create({
      data: {
        entityId: customer.id,
        entityType: 'Customer',
        action: 'CREATE',
        userId: Number(session.user.id),
        changes: JSON.parse(JSON.stringify(customer)),
      },
    });

    revalidatePath('/customers');

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_CREATED),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = (error.meta?.target as string[]) || [];

        if (target.includes('email')) {
          return {
            message: customerFormContent.t(CustomerFormContentPhrases.EMAIL_IN_USE),
          };
        }

        if (target.includes('number')) {
          return {
            message: customerFormContent.t(CustomerFormContentPhrases.PHONE_NUMBER_IN_USE),
          };
        }
      }
    }

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_CREATING),
    };
  }
}
