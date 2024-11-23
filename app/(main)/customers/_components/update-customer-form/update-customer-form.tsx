'use client';

import { Card } from '@mantine/core';

import { CustomerForm } from '../customer-form';

export default function UpdateCustomerForm() {
  return (
    <Card shadow="sm" radius="md" padding="xl">
      <CustomerForm />
    </Card>
  );
}
