'use client';

import { Passepartout } from '@prisma/client';

import { MainTable } from '@/components/main-table';
import { columns } from './passepartouts-table.columns';

type PassepartoutDataType = Partial<Passepartout>;

export interface PassepartoutsTableProps {
  passepartouts: PassepartoutDataType[];
}

export default function PassepartoutsTable({ passepartouts }: PassepartoutsTableProps) {
  return (
    <MainTable<PassepartoutDataType> columns={columns} data={passepartouts} navigateOnRowClick />
  );
}
