'use client';

import { Frame } from '@prisma/client';

import { columns } from './frames-table.columns';
import { MainTable } from '@/components/main-table';

type FrameDataType = Partial<Frame>;

export interface FramesTableProps {
  frames: FrameDataType[];
}

export default function FramesTable({ frames }: FramesTableProps) {
  return <MainTable<FrameDataType> columns={columns} data={frames} navigateOnRowClick />;
}
