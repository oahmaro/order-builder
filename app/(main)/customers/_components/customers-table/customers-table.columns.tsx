import dayjs from 'dayjs';
import Link from 'next/link';
import { Anchor } from '@mantine/core';
import { Customer, Phone } from '@prisma/client';
import { createColumnHelper } from '@tanstack/react-table';

import { generateUserTitle } from '@/utils/get-user-title';
import { customersTableContent, CustomersTableContentPhrases } from './customers-table.content';

type CustomerDataType = Partial<Customer> & {
  phones: Phone[];
  createdByUser?: { id: number; firstName: string; lastName: string } | null;
  updatedByUser?: { id: number; firstName: string; lastName: string } | null;
};

const columnHelper = createColumnHelper<CustomerDataType>();

const formatPhoneNumber = (countryCode: string, number: string): string => {
  const cleanCountryCode = countryCode.replace(/\D/g, '');
  const cleanNumber = number.replace(/\D/g, '');

  return `(+${cleanCountryCode}) ${cleanNumber.slice(0, 4)}-${cleanNumber.slice(
    4,
    7
  )}-${cleanNumber.slice(7)}`;
};

export const columns = [
  columnHelper.accessor('id', {
    header: customersTableContent.t(CustomersTableContentPhrases.ID),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/customers/${info.getValue()}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
    id: 'fullName',
    header: customersTableContent.t(CustomersTableContentPhrases.NAME),
    cell: (info) => (
      <Anchor size="sm" component={Link} href={`/customers/${info.row.original.id}`}>
        {info.getValue()}
      </Anchor>
    ),
  }),

  columnHelper.accessor(
    (row) => {
      const primaryPhone = row.phones.find((phone) => phone.isPrimary);
      return primaryPhone ? formatPhoneNumber(primaryPhone.dialingCode, primaryPhone.number) : '';
    },
    {
      id: 'primaryPhone',
      header: customersTableContent.t(CustomersTableContentPhrases.PHONE),
      cell: (info) => (
        <span style={{ direction: 'ltr', unicodeBidi: 'embed', display: 'inline-block' }}>
          {info.getValue()}
        </span>
      ),
    }
  ),
  columnHelper.accessor('email', {
    header: customersTableContent.t(CustomersTableContentPhrases.EMAIL),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('dateOfBirth', {
    header: customersTableContent.t(CustomersTableContentPhrases.DATE_OF_BIRTH),
    cell: (info) => (info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY') : ''),
  }),

  columnHelper.accessor('createdByUser', {
    header: customersTableContent.t(CustomersTableContentPhrases.CREATED_BY),
    cell: (info) => {
      const user = info.getValue();
      return user ? (
        <Anchor component={Link} size="sm" href={`/users/${user.id}`}>
          {generateUserTitle(user)}
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
    header: customersTableContent.t(CustomersTableContentPhrases.CREATED_AT),
    cell: (info) => (info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY HH:mm') : ''),
  }),
  columnHelper.accessor('updatedAt', {
    header: customersTableContent.t(CustomersTableContentPhrases.UPDATED_AT),
    cell: (info) => (info.getValue() ? dayjs(info.getValue()).format('DD/MM/YYYY HH:mm') : ''),
  }),
];
