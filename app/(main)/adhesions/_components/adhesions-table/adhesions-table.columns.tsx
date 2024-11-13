import dayjs from 'dayjs';
import Link from 'next/link';
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

  columnHelper.accessor('createdByUser', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.CREATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('createdAt', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedByUser', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.UPDATED_BY),
    enableHiding: true,
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Link href={`/users/${user.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {generateUserTitle(user)}
        </Link>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedAt', {
    header: adhesionsTableContent.t(AdhesionsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
