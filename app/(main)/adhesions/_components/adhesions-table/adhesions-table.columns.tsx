import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor } from '@mantine/core';
import { Adhesion } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { adhesionsTableContent, AdhesionsTableContentPhrases } from './adhesions-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type AdhesionDataType = Partial<Adhesion> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<AdhesionDataType>();

export const columns = [
  columnHelper.accessor((row) => String(row.id), {
    id: 'id',
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.ID),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor((row) => `${row.id} ${row.name}`, {
    id: 'name',
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.NAME),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/adhesions/${info.row.original.id}`}>
        {info.row.original.name}
      </Anchor>
    ),
  }),

  columnHelper.accessor(
    (row) =>
      row.createdByUser ? `${row.createdByUser.id} ${generateUserTitle(row.createdByUser)}` : '',
    {
      id: 'createdBy',
      header: adhesionsTableContent.t(AdhesionsTableContentPhrases.CREATED_BY),
      cell: (info) => {
        const user = info.row.original.createdByUser;
        return user ? (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {generateUserTitle(user)}
          </Anchor>
        ) : (
          'N/A'
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedByUser ? `${row.updatedByUser.id} ${generateUserTitle(row.updatedByUser)}` : '',
    {
      id: 'updatedBy',
      header: adhesionsTableContent.t(AdhesionsTableContentPhrases.UPDATED_BY),
      cell: (info) => {
        const user = info.row.original.updatedByUser;
        return user ? (
          <Anchor size="sm" component={Link} href={`/users/${user.id}`}>
            {generateUserTitle(user)}
          </Anchor>
        ) : (
          'N/A'
        );
      },
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'createdAt',
      header: adhesionsTableContent.t(AdhesionsTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.getValue() && dayjs(info.row.original.createdAt).format('MMMM D, YYYY h:mm A'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('MMMM D, YYYY h:mm A')}`
        : '',
    {
      id: 'updatedAt',
      header: adhesionsTableContent.t(AdhesionsTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.getValue() && dayjs(info.row.original.updatedAt).format('MMMM D, YYYY h:mm A'),
    }
  ),
];
