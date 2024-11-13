'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { companyFormSchema } from '../../_components/company-form/company-form.schema';

import {
  updateCompanyActionContent,
  UpdateCompanyActionContentPhrases,
} from './update-company-action.content';

type FormState = {
  message: string;
  errors?: any[];
};

export async function updateCompanyAction(data: FormData): Promise<FormState> {
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
  const companyId = parseInt(formData.companyId as string, 10);

  const parsed = companyFormSchema.safeParse({
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
      message: updateCompanyActionContent.t(UpdateCompanyActionContentPhrases.FORM_DATA_INVALID),
      errors: parsed.error.errors,
    };
  }

  const { name, email, phones, address } = parsed.data;

  try {
    // Get the old data for audit
    const oldCompany = await db.company.findUnique({
      where: { id: companyId },
      include: {
        address: true,
        phones: true,
      },
    });

    if (!oldCompany) {
      return {
        message: 'Company not found',
      };
    }

    let addressId = null;
    if (address && Object.values(address).some(Boolean)) {
      const filteredAddressData = Object.fromEntries(
        Object.entries(address).filter(([, value]) => value !== '')
      );

      if (Object.keys(filteredAddressData).length > 0) {
        const existingCompany = await db.company.findUnique({
          where: { id: companyId },
          include: { address: true },
        });

        if (existingCompany?.address) {
          await db.address.update({
            where: { id: existingCompany.address.id },
            data: filteredAddressData,
          });
          addressId = existingCompany.address.id;
        } else {
          const createdAddress = await db.address.create({
            data: filteredAddressData,
          });
          addressId = createdAddress.id;
        }
      }
    }

    await db.company.update({
      where: { id: companyId },
      data: {
        name,
        email: email || undefined,
        addressId: addressId || undefined,
        phones: {
          deleteMany: {},
          create: phones.map((phone) => ({
            countryCode: phone.countryCode?.toString() ?? '',
            number: phone.number?.toString() ?? '',
            type: phone.type,
            isPrimary: Boolean(phone.isPrimary),
            dialingCode: phone.dialingCode?.toString() ?? '',
          })),
        },
      },
    });

    revalidatePath('/company');

    return {
      message: updateCompanyActionContent.t(UpdateCompanyActionContentPhrases.COMPANY_UPDATED),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        message: updateCompanyActionContent.t(
          UpdateCompanyActionContentPhrases.PHONE_NUMBER_IN_USE
        ),
      };
    }

    return {
      message: updateCompanyActionContent.t(UpdateCompanyActionContentPhrases.ERROR_WHILE_UPDATING),
    };
  }
}
