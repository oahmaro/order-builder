import dayjs from 'dayjs';
import { Adhesion } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { adhesionsTableContent, AdhesionsTableContentPhrases } from './adhesions-table.content';

type AdhesionDataType = Partial<Adhesion>;

const columnHelper = createColumnHelper<AdhesionDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdAt', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),

  columnHelper.accessor('updatedAt', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),
];
