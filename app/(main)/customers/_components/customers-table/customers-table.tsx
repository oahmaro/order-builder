'use client';

import { useState } from 'react';
import { Customer, Phone } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { columns } from './customers-table.columns';
import { MainTable } from '@/components/main-table';

type CustomerDataType = Partial<Customer> & { phones: Phone[] };

export interface CustomersTableProps {
  customers: CustomerDataType[];
}

export default function CustomersTable({ customers }: CustomersTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>(() => {
    const sortField = searchParams?.get('sortBy');
    const sortDir = searchParams?.get('sortDir');
    return sortField && sortDir ? [{ id: sortField, desc: sortDir === 'desc' }] : [];
  });

  const handleSortingChange = (newSorting: SortingState) => {
    setSorting(newSorting);
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (newSorting.length > 0) {
      params.set('sortBy', newSorting[0].id);
      params.set('sortDir', newSorting[0].desc ? 'desc' : 'asc');
    } else {
      params.delete('sortBy');
      params.delete('sortDir');
    }

    router.push(`/customers?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('pageSize', String(newPageSize));
    router.push(`/customers?${params.toString()}`);
  };

  const initialPageSize = Number(searchParams?.get('pageSize')) || 10;

  return (
    <MainTable<CustomerDataType>
      data={customers}
      columns={columns}
      enableSorting
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
      onPageSizeChange={handlePageSizeChange}
      initialPageSize={initialPageSize}
    />
  );
}
