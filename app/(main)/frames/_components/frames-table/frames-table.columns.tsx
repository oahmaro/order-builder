import { Frame } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { framesTableContent, FramesTableContentPhrases } from './frames-table.content';

type FrameDataType = Partial<Frame>;

const columnHelper = createColumnHelper<FrameDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: framesTableContent.t(FramesTableContentPhrases.ID),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: framesTableContent.t(FramesTableContentPhrases.NAME),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: framesTableContent.t(FramesTableContentPhrases.DESCRIPTION),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('createdAt', {
    header: framesTableContent.t(FramesTableContentPhrases.CREATED_AT),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('updatedAt', {
    header: framesTableContent.t(FramesTableContentPhrases.UPDATED_AT),
    cell: (info) => info.getValue(),
  }),
];
