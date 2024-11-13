import dayjs from 'dayjs';
import Link from 'next/link';
import { Description } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import {
  descriptionsTableContent,
  DescriptionsTableContentPhrases,
} from './description-table.content';
import { generateUserTitle } from '@/utils/get-user-title';

type DescriptionDataType = Partial<Description> & {
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<DescriptionDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('name', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_BY),
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
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('updatedByUser', {
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_BY),
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
    header: descriptionsTableContent.t(DescriptionsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
