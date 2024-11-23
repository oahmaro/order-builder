'use client';

import { useState } from 'react';
import { Description } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { MainTable } from '@/components/main-table';
import { columns } from './description-table.columns';

type DescriptionDataType = Partial<Description>;

export interface DescriptionsTableProps {
  descriptions: DescriptionDataType[];
}

export default function DescriptionsTable({ descriptions }: DescriptionsTableProps) {
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

    router.push(`/descriptions?${params.toString()}`);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('pageSize', String(newPageSize));
    router.push(`/descriptions?${params.toString()}`);
  };

  const initialPageSize = Number(searchParams?.get('pageSize')) || 10;

  return (
    <MainTable<DescriptionDataType>
      data={descriptions}
      columns={columns}
      enableSorting
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
      onPageSizeChange={handlePageSizeChange}
      initialPageSize={initialPageSize}
    />
  );
}
