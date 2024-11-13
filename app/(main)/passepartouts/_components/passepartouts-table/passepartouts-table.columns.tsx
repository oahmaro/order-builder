import dayjs from 'dayjs';
import Link from 'next/link';
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
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.NAME),
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor('createdAt', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),

  columnHelper.accessor('createdByUser', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_BY),
    cell: (info) =>
      info.getValue()?.id ? (
        <Link href={`/users/${info.getValue()?.id}`} className="hover:underline">
          {generateUserTitle({
            firstName: info.getValue()?.firstName,
            lastName: info.getValue()?.lastName,
          })}
        </Link>
      ) : (
        'N/A'
      ),
  }),

  columnHelper.accessor('updatedByUser', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_BY),
    cell: (info) =>
      info.getValue()?.id ? (
        <Link href={`/users/${info.getValue()?.id}`} className="hover:underline">
          {generateUserTitle({
            firstName: info.getValue()?.firstName,
            lastName: info.getValue()?.lastName,
          })}
        </Link>
      ) : (
        'N/A'
      ),
  }),

  columnHelper.accessor('updatedAt', {
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
