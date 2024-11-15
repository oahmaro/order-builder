'use client';

import { Description } from '@prisma/client';

import { MainTable } from '@/components/main-table';
import { columns } from './description-table.columns';

type DescriptionDataType = Partial<Description>;

export interface DescriptionsTableProps {
  descriptions: DescriptionDataType[];
}

export default function DescriptionsTable({ descriptions }: DescriptionsTableProps) {
  return <MainTable<DescriptionDataType> columns={columns} data={descriptions} />;
}
