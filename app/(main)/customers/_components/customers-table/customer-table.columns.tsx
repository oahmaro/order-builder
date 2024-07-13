import dayjs from 'dayjs';
import { Customer } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { customersTableContent, CustomersTableContentPhrases } from './customers-table.content';

type CustomerDataType = Partial<Customer>;

const columnHelper = createColumnHelper<CustomerDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: customersTableContent.t(CustomersTableContentPhrases.ID),
    enableHiding: false,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('firstName', {
    header: customersTableContent.t(CustomersTableContentPhrases.FIRST_NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    header: customersTableContent.t(CustomersTableContentPhrases.LAST_NAME),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: customersTableContent.t(CustomersTableContentPhrases.PHONE),
    enableHiding: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: customersTableContent.t(CustomersTableContentPhrases.EMAIL),
    enableHiding: true,
    cell: (info) => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('dateOfBirth', {
    header: customersTableContent.t(CustomersTableContentPhrases.DATE_OF_BIRTH),
    enableHiding: true,
    cell: (info) => info.getValue() || 'N/A',
  }),
  columnHelper.accessor('createdAt', {
    header: customersTableContent.t(CustomersTableContentPhrases.CREATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),
  columnHelper.accessor('updatedAt', {
    header: customersTableContent.t(CustomersTableContentPhrases.UPDATED_AT),
    enableHiding: true,
    cell: (info) => dayjs(info.getValue()).format('MMMM D, YYYY h:mm A') || 'N/A',
  }),
];
