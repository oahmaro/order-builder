'use client';

import { useState } from 'react';
import { Frame } from '@prisma/client';
import { SortingState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';

import { columns } from './frames-table.columns';
import { MainTable } from '@/components/main-table';

type FrameDataType = Partial<Frame>;

export interface FramesTableProps {
  frames: FrameDataType[];
}

export default function FramesTable({ frames }: FramesTableProps) {
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

    router.push(`/frames?${params.toString()}`);
  };

  return (
    <MainTable<FrameDataType>
      data={frames}
      columns={columns}
      enableSorting
      onSortingChange={handleSortingChange}
      initialSorting={sorting}
    />
  );
}
