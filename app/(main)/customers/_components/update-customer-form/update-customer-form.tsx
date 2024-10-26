'use client';

import { Card, Stack } from '@mantine/core';
import { Customer } from '@prisma/client';
import { CustomerPageHeader } from '../customer-page-header';
import { CustomerForm } from '../customer-form';

export default function UpdateCustomerForm({ customer }: { customer: Customer }) {
  return (
    <form onSubmit={() => {}} noValidate>
      <Stack gap="lg">
        <CustomerPageHeader name={`${customer?.firstName} ${customer?.lastName}`} />

        <Card shadow="sm" radius="md" padding="xl">
          <CustomerForm />
        </Card>
      </Stack>
    </form>
  );
}
