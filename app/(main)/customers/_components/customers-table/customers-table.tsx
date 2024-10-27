'use client';

import { Customer, Phone } from '@prisma/client';

import { columns } from './customers-table.columns';
import { MainTable } from '@/components/main-table';

type CustomerDataType = Partial<Customer> & { phones: Phone[] };

export interface CustomersTableProps {
  customers: CustomerDataType[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  return <MainTable<CustomerDataType> columns={columns} data={customers} navigateOnRowClick />;
}
