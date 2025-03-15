'use client';

import { useState } from 'react';
import { Print } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { columns } from './prints-table.columns';
import { MainTable } from '@/components/main-table';

type PrintDataType = Partial<Print>;

export interface PrintsTableProps {
  prints: PrintDataType[];
}

export default function PrintsTable({ prints }: PrintsTableProps) {
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

    router.push(`/prints?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('pageSize', String(newPageSize));
    router.push(`/prints?${params.toString()}`);
  };

  const initialPageSize = Number(searchParams?.get('pageSize')) || 10;

  return (
    <MainTable<PrintDataType>
      data={prints}
      enableSorting
      columns={columns}
      initialSorting={sorting}
      initialPageSize={initialPageSize}
      onSortingChange={handleSortingChange}
      onPageSizeChange={handlePageSizeChange}
      initialColumnsVisibility={{
        id: false,
        updatedAt: true,
        createdAt: false,
        createdBy: true,
        updatedBy: false,
      }}
    />
  );
}
