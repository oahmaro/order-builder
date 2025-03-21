import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor } from '@mantine/core';
import { Customer, Phone } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { formatPhoneNumber } from '@/utils';
import { generateUserTitle } from '@/utils/get-user-title';
import { highlightSearchTerm } from '@/utils/highlight-search';
import { customersTableContent, CustomersTableContentPhrases } from './customers-table.content';

type CustomerDataType = Partial<Customer> & {
  phones: Phone[];
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<CustomerDataType>();

export const columns = [
  columnHelper.accessor('id', {
    header: customersTableContent.t(CustomersTableContentPhrases.ID),
    cell: (info) => {
      const customerId = String(info.getValue());
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <Anchor size="sm" component={Link} href={`/customers/${info.getValue()}`}>
          {highlightSearchTerm(customerId, searchQuery)}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'name',
    header: customersTableContent.t(CustomersTableContentPhrases.NAME),
    cell: (info) => {
      const customerName = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return (
        <Anchor size="sm" component={Link} href={`/customers/${info.row.original.id}`}>
          {highlightSearchTerm(customerName, searchQuery)}
        </Anchor>
      );
    },
  }),

  columnHelper.accessor(
    (row) => {
      const primaryPhone = row.phones.find((phone) => phone.isPrimary);
      return primaryPhone ? formatPhoneNumber(primaryPhone.number) : '';
    },
    {
      id: 'primaryPhone',
      header: customersTableContent.t(CustomersTableContentPhrases.PHONE),
      cell: (info) => {
        const phoneNumber = info.getValue();
        const searchQuery = info.table.getState().globalFilter || '';

        return (
          <span style={{ direction: 'ltr', unicodeBidi: 'embed', display: 'inline-block' }}>
            {highlightSearchTerm(phoneNumber, searchQuery)}
          </span>
        );
      },
    }
  ),

  columnHelper.accessor('email', {
    header: customersTableContent.t(CustomersTableContentPhrases.EMAIL),
    cell: (info) => {
      const email = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';

      return highlightSearchTerm(email || '', searchQuery);
    },
  }),

  columnHelper.accessor('dateOfBirth', {
    header: customersTableContent.t(CustomersTableContentPhrases.DATE_OF_BIRTH),
    cell: (info) => (info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY') : ''),
  }),

  columnHelper.accessor('createdByUser', {
    header: customersTableContent.t(CustomersTableContentPhrases.CREATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';
      const userTitle = user ? generateUserTitle(user) : 'N/A';

      return user ? (
        <Anchor component={Link} size="sm" href={`/users/${user.id}`}>
          {highlightSearchTerm(userTitle, searchQuery)}
        </Anchor>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor('updatedByUser', {
    header: customersTableContent.t(CustomersTableContentPhrases.UPDATED_BY),
    cell: (info) => {
      const user = info.getValue();
      const searchQuery = info.table.getState().globalFilter || '';
      const userTitle = user ? generateUserTitle(user) : 'N/A';

      return user ? (
        <Anchor component={Link} size="sm" href={`/users/${user.id}`}>
          {highlightSearchTerm(userTitle, searchQuery)}
        </Anchor>
      ) : (
        'N/A'
      );
    },
  }),

  columnHelper.accessor(
    (row) =>
      row.createdAt
        ? `${row.createdAt.toISOString()} ${dayjs(row.createdAt).format('DD/MM/YYYY HH:mm')}`
        : '',
    {
      id: 'createdAt',
      header: customersTableContent.t(CustomersTableContentPhrases.CREATED_AT),
      cell: (info) =>
        info.row.original.createdAt &&
        dayjs(info.row.original.createdAt).format('DD/MM/YYYY HH:mm'),
    }
  ),

  columnHelper.accessor(
    (row) =>
      row.updatedAt
        ? `${row.updatedAt.toISOString()} ${dayjs(row.updatedAt).format('DD/MM/YYYY HH:mm')}`
        : '',
    {
      id: 'updatedAt',
      header: customersTableContent.t(CustomersTableContentPhrases.UPDATED_AT),
      cell: (info) =>
        info.row.original.updatedAt &&
        dayjs(info.row.original.updatedAt).format('DD/MM/YYYY HH:mm'),
    }
  ),
];
