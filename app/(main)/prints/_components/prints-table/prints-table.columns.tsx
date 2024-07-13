import dayjs from 'dayjs';
import { Print } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { printsTableContent, PrintsTableContentPhrases } from './prints-table.content';

type PrintDataType = Partial<Print>;

const columnHelper = createColumnHelper<PrintDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: printsTableContent.t(PrintsTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: printsTableContent.t(PrintsTableContentPhrases.NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdAt', {
    header: printsTableContent.t(PrintsTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedAt', {
    header: printsTableContent.t(PrintsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
