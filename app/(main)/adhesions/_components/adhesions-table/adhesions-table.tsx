'use client';

import { Adhesion } from '@prisma/client';
import { MainTable } from '@/components/main-table';
import { columns } from './adhesions-table.columns';

type AdhesionDataType = Partial<Adhesion>;

export interface AdhesionsTableProps {
  adhesions: AdhesionDataType[];
}

export default function AdhesionsTable({ adhesions }: AdhesionsTableProps) {
  return <MainTable<AdhesionDataType> columns={columns} data={adhesions} navigateOnRowClick />;
}
