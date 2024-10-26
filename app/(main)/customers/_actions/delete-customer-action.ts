'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import {
  customerFormContent,
  CustomerFormContentPhrases,
} from '../_components/customer-form/customer-form.content';

export type DeleteCustomerFormState = {
  message: string;
};

export async function deleteCustomerAction(customerId: number): Promise<DeleteCustomerFormState> {
  try {
    await db.customer.delete({
      where: { id: customerId },
    });

    revalidatePath('/customers');

    return {
      message: customerFormContent.t(CustomerFormContentPhrases.CUSTOMER_DELETED),
    };
  } catch (error) {
    console.error('Error deleting customer', error);
    return {
      message: customerFormContent.t(CustomerFormContentPhrases.ERROR_WHILE_DELETING),
    };
  }
}
