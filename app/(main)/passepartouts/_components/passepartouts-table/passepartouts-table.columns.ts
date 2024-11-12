import dayjs from 'dayjs';
import { Passepartout } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import {
  passepartoutsTableContent,
  PassepartoutsTableContentPhrases,
} from './passepartouts-table.content';

type PassepartoutDataType = Partial<Passepartout>;

const columnHelper = createColumnHelper<PassepartoutDataType>();

export const columns = [
  columnHelper.accessor('id', {
    enableHiding: true,
    cell: (info) => info.getValue(),
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.ID),
  }),
  columnHelper.accessor('name', {
    enableHiding: true,
    cell: (info) => info.getValue(),
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.NAME),
  }),
  columnHelper.accessor('createdAt', {
    enableHiding: true,
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.CREATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
  columnHelper.accessor('updatedAt', {
    enableHiding: true,
    header: passepartoutsTableContent.t(PassepartoutsTableContentPhrases.UPDATED_AT),
    cell: (info) => info.getValue() && dayjs(info.getValue()).format('MMMM D, YYYY h:mm A'),
  }),
];
