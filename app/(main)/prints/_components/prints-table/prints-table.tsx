'use client';

import { Print } from '@prisma/client';

import { MainTable } from '@/components/main-table';
import { columns } from './prints-table.columns';

type PrintDataType = Partial<Print>;

export interface PrintsTableProps {
  prints: PrintDataType[];
}

export default function PrintsTable({ prints }: PrintsTableProps) {
  return <MainTable<PrintDataType> columns={columns} data={prints} />;
}
