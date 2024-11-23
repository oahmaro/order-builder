import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor } from '@mantine/core';
import { Passepartout } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import {
  passepartoutsTableContent,
  PassepartoutsTableContentPhrases,
} from './passepartouts-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type PassepartoutDataType = Partial<Passepartout> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<PassepartoutDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.ID),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    id: 'name',
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.NAME),
    sortingFn: (rowA, rowB) => (rowA.original.name ?? '').localeCompare(rowB.original.name ?? ''),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/passepartouts/${info.row.original.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor('createdByUser', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_BY),
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
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_BY),
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

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'createdAt',
      header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt &&
        dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'updatedAt',
      header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.row.original.updatedAt &&
        dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A'),
    }
  ),
];
