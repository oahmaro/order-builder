'use client';

import { useState } from 'react';
import { Adhesion } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { columns } from './adhesions-table.columns';
import { MainTable } from '@/components/main-table';

type AdhesionDataType = Partial<Adhesion>;

export interface AdhesionsTableProps {
  adhesions: AdhesionDataType[];
}

export default function AdhesionsTable({ adhesions }: AdhesionsTableProps) {
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

    router.push(`/adhesions?${params.toString()}`);
  };

  return (
    <MainTable<AdhesionDataType>
      data={adhesions}
      columns={columns}
      enableSorting
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
    />
  );
}
