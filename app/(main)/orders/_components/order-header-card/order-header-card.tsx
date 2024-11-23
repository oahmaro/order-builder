'use client';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { Customer, Order, Phone } from '@prisma/client';

import {
  Box,
  Text,
  Group,
  Image,
  Paper,
  Stack,
  Select,
  NumberInput,
  ComboboxItem,
  NumberFormatter,
} from '@mantine/core';

import { StaticField } from '@/components';
import classes from './order-header-card.module.css';
import { CreateCustomerForm } from '@/app/(main)/customers/_components';
import { useOrderFormContext } from '../order-form/order-form.container';
import { orderHeaderContent, OrderHeaderContentPhrases } from './order-header-card.content';
import CustomerFormContainer from '@/app/(main)/customers/_components/customer-form/customer-form.container';

export interface OrderHeaderCardProps {
  order?: Order;
  customers?: (Customer & { phones: Phone[] })[];
  company?: {
    name: string;
    email: string;
    phones: {
      number: string;
      dialingCode: string;
      isPrimary: boolean;
    }[];
    address?: {
      streetAddress?: string;
      city?: string;
    };
  };
}

const formatPhoneNumber = (dialingCode: string, number: string): string => {
  if (!number) return '—';

  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.length < 4) return `(${dialingCode}) ${cleanNumber}`;

  if (cleanNumber.length < 7) {
    return `(${dialingCode}) ${cleanNumber.slice(0, 4)}-${cleanNumber.slice(4)}`;
  }
  return `(${dialingCode}) ${cleanNumber.slice(0, 4)}-${cleanNumber.slice(
    4,
    7
  )}-${cleanNumber.slice(7)}`;
};

const handleCreateCustomer = () => {
  modals.open({
    title: orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_CUSTOMER),
    size: 'xl',
    children: (
      <CustomerFormContainer>
        <CreateCustomerForm />
      </CustomerFormContainer>
    ),
  });
};

export default function OrderHeaderCard({ order, customers, company }: OrderHeaderCardProps) {
  const form = useOrderFormContext();

  const customerItems = customers
    ? customers.map((customer) => {
        const phoneNumbers = customer.phones.map((phone) => ({
          formatted: formatPhoneNumber(phone.dialingCode, phone.number),
          raw: phone.number.replace(/\D/g, ''),
        }));

        return {
          label: `${customer.firstName} ${customer.lastName}`,
          value: String(customer.id),
          searchValue: `${customer.firstName} ${customer.lastName} ${phoneNumbers
            .map((p) => `${p.formatted} ${p.raw}`)
            .join(' ')}`.toLowerCase(),
        };
      })
    : [];

  const selectedCustomer = customers?.find(
    (customer) => String(customer.id) === String(form.values.customerId)
  );

  const primaryPhone = selectedCustomer?.phones?.find((phone) => phone.isPrimary);
  const formattedPhone = primaryPhone
    ? formatPhoneNumber(primaryPhone.dialingCode, primaryPhone.number)
    : '—';

  // Calculate total
  const total = form.values.orderItems.reduce((sum, item) => {
    const itemTotal = (item.unitPrice || 0) * (item.quantity || 1);
    return sum + itemTotal;
  }, 0);

  // Update prices in effect
  useEffect(() => {
    form.values.orderItems.forEach((item, index) => {
      const itemTotal = (item.unitPrice || 0) * (item.quantity || 1);
      form.setFieldValue(`orderItems.${index}.price`, itemTotal);
    });
  }, [form.values.orderItems]);

  const amountPaid = form.values.amountPaid || 0;
  const remainingToPay = total - amountPaid;

  const createNewCustomerOption = {
    label: orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_NEW_CUSTOMER),
    value: 'create_new',
  };

  const companyPhone = company?.phones?.find((phone) => phone.isPrimary);
  const formattedCompanyPhone = companyPhone
    ? formatPhoneNumber(companyPhone.dialingCode, companyPhone.number)
    : orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_PHONE);

  const companyAddress = company?.address
    ? `${company.address.streetAddress || ''} ${company.address.city || ''}`
    : orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_ADDRESS);

  return (
    <Paper className={classes.root} shadow="xs" radius="sm">
      <Group>
        <Stack flex={1} h="100%" gap={4}>
          <Group align="flex-start">
            <Stack justify="center" h={36}>
              <Text fz="sm">{orderHeaderContent.t(OrderHeaderContentPhrases.NAME)}</Text>
            </Stack>

            <Select
              size="sm"
              searchable
              clearable
              allowDeselect
              spellCheck="false"
              error={form.errors.customerId}
              data={[...customerItems, createNewCustomerOption]}
              filter={({ options, search }) => {
                const searchTerm = search.toLowerCase().trim();
                return (options as ComboboxItem[]).filter(
                  (item: any) =>
                    item.searchValue?.includes(searchTerm) ||
                    item.label.toLowerCase().includes(searchTerm)
                );
              }}
              renderOption={({ option }) =>
                option.value === 'create_new' ? (
                  <Box
                    style={{ cursor: 'pointer', color: 'inherit', textAlign: 'right' }}
                    fw={500}
                    c="dark"
                  >
                    <Group gap={8}>
                      <IconPlus size={14} stroke={1.5} />
                      <span>{option.label}</span>
                    </Group>
                  </Box>
                ) : (
                  <span>{option.label}</span>
                )
              }
              value={form.values.customerId ? String(form.values.customerId) : null}
              onChange={(value) => {
                if (value === 'create_new') {
                  handleCreateCustomer();
                } else {
                  form.setFieldValue('customerId', value ? Number(value) : 0);
                }
              }}
              placeholder={orderHeaderContent.t(OrderHeaderContentPhrases.CUSTOMER_PLACEHOLDER)}
              nothingFoundMessage={
                <Box
                  style={{ cursor: 'pointer', color: 'inherit', textAlign: 'right' }}
                  fw={500}
                  c="dark"
                  onClick={() => handleCreateCustomer()}
                >
                  <Group gap={8}>
                    <IconPlus size={14} stroke={1.5} />
                    <span>
                      {orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_NEW_CUSTOMER)}
                    </span>
                  </Group>
                </Box>
              }
            />
          </Group>

          <StaticField
            separator=": "
            value={
              <span style={{ direction: 'ltr', unicodeBidi: 'embed', display: 'inline-block' }}>
                {formattedPhone}
              </span>
            }
            label={orderHeaderContent.t(OrderHeaderContentPhrases.PHONE_NUMBER)}
          />

          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.TOTAL)}
            value={
              <Box component="span" c="red" fw="bold" fz="sm">
                <NumberFormatter prefix="₪" value={total} thousandSeparator />
              </Box>
            }
            separator=": "
          />

          <NumberInput
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px' },
              input: { width: 160 },
            }}
            hideControls
            allowLeadingZeros={false}
            label={orderHeaderContent.t(OrderHeaderContentPhrases.ADVANCE_PAYMENT)}
            prefix="₪"
            {...form.getInputProps('amountPaid')}
          />

          <Box c="dimmed">-----------------------</Box>
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.TOTAL_TO_PAY)}
            value={<NumberFormatter prefix="₪" value={remainingToPay} thousandSeparator />}
            separator=": "
          />
        </Stack>

        <Stack flex={2} h="100%" align="center">
          <Box fw="bold">
            <Box component="span" fw="bold">
              {orderHeaderContent.t(OrderHeaderContentPhrases.ORDER_NUMBER)}
            </Box>{' '}
            <Box component="span" c="red.8">
              {order?.id ?? '—'}
            </Box>
          </Box>

          <Image
            fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            src="/logo.png"
            radius="lg"
            maw={180}
          />
        </Stack>

        <Stack flex={1} h="100%" gap={0}>
          {order?.createdAt && (
            <StaticField
              label={orderHeaderContent.t(OrderHeaderContentPhrases.TIME)}
              value={dayjs(order.createdAt).format('ddd D MMM - HH:mm')}
              separator=": "
            />
          )}

          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.ADDRESS)}
            value={companyAddress}
            separator=": "
          />
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.EMAIL)}
            value={
              company?.email || orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_EMAIL)
            }
            separator=": "
          />
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.PHONE)}
            value={
              <span style={{ direction: 'ltr', unicodeBidi: 'embed', display: 'inline-block' }}>
                {formattedCompanyPhone}
              </span>
            }
            separator=": "
          />
        </Stack>
      </Group>
    </Paper>
  );
}
