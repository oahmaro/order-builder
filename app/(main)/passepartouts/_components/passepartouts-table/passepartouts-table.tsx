'use client';

import { useState } from 'react';
import { Passepartout } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { MainTable } from '@/components/main-table';
import { columns } from './passepartouts-table.columns';

type PassepartoutDataType = Partial<Passepartout>;

export interface PassepartoutsTableProps {
  passepartouts: PassepartoutDataType[];
}

export default function PassepartoutsTable({ passepartouts }: PassepartoutsTableProps) {
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

    router.push(`/passepartouts?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('pageSize', String(newPageSize));
    router.push(`/passepartouts?${params.toString()}`);
  };

  const initialPageSize = Number(searchParams?.get('pageSize')) || 10;

  return (
    <MainTable<PassepartoutDataType>
      data={passepartouts}
      columns={columns}
      enableSorting
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
      onPageSizeChange={handlePageSizeChange}
      initialPageSize={initialPageSize}
    />
  );
}
