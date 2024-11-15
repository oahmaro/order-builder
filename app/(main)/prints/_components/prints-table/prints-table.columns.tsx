import dayjs from 'dayjs';
import Link from 'next/link';
import { Print } from '@prisma/client';
import { Anchor } from '@mantine/core';
import { createColumnHelper } from '@tanstack/react-table';

import { printsTableContent, PrintsTableContentPhrases } from './prints-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type PrintDataType = Partial<Print> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<PrintDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: printsTableContent.t(PrintsTableContentPhrases.ID),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: printsTableContent.t(PrintsTableContentPhrases.NAME),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/prints/${info.row.original.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor('createdAt', {
    header: printsTableContent.t(PrintsTableContentPhrases.CREATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('createdByUser', {
    header: printsTableContent.t(PrintsTableContentPhrases.CREATED_BY),
    cell: (info) =>
      info.getValue()?.id ? (
        <Anchor size="sm" component={Link} href={`/users/${info.getValue()?.id}`}>
          {generateUserTitle({
            firstName: info.getValue()?.firstName,
            lastName: info.getValue()?.lastName,
          })}
        </Anchor>
      ) : (
        'N/A'
      ),
  }),

  columnHelper.accessor('updatedByUser', {
    header: printsTableContent.t(PrintsTableContentPhrases.UPDATED_BY),
    cell: (info) =>
      info.getValue()?.id ? (
        <Anchor size="sm" component={Link} href={`/users/${info.getValue()?.id}`}>
          {generateUserTitle({
            firstName: info.getValue()?.firstName,
            lastName: info.getValue()?.lastName,
          })}
        </Anchor>
      ) : (
        'N/A'
      ),
  }),

  columnHelper.accessor('updatedAt', {
    header: printsTableContent.t(PrintsTableContentPhrases.UPDATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
