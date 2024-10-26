'use client';

import { Customer, Phone } from '@prisma/client';
import { MainTable } from '@/components/main-table';
import { columns } from './customer-table.columns';

type CustomerDataType = Partial<Customer> & { phones: Phone[] };

export interface CustomersTableProps {
  customers: CustomerDataType[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  return <MainTable<CustomerDataType> columns={columns} data={customers} navigateOnRowClick />;
}
