'use client';

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
  NumberFormatter,
  ComboboxItem,
} from '@mantine/core';
import { useEffect } from 'react';
import { modals } from '@mantine/modals';

import { StaticField } from '@/components';
import classes from './order-header-card.module.css';
import { useOrderFormContext } from '../order-form/order-form.container';
import { orderHeaderContent, OrderHeaderContentPhrases } from './order-header-card.content';
import { CreateCustomerForm } from '@/app/(main)/customers/_components';
import CustomerFormContainer from '@/app/(main)/customers/_components/customer-form/customer-form.container';

export interface OrderHeaderCardProps {
  order?: Order;
  customers?: (Customer & { phones: Phone[] })[];
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

export default function OrderHeaderCard({ order, customers }: OrderHeaderCardProps) {
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
              spellCheck="false"
              data={[...customerItems, createNewCustomerOption]}
              filter={({ options, search }) => {
                const searchTerm = search.toLowerCase().trim();
                return (options as ComboboxItem[]).filter(
                  (item: any) =>
                    item.searchValue?.includes(searchTerm) ||
                    item.label.toLowerCase().includes(searchTerm)
                );
              }}
              nothingFoundMessage={
                <Box
                  onClick={() => handleCreateCustomer()}
                  style={{ cursor: 'pointer', color: 'inherit', textAlign: 'right' }}
                  fw={500}
                  c="dark"
                >
                  {orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_NEW_CUSTOMER)}
                </Box>
              }
              value={form.values.customerId ? String(form.values.customerId) : ''}
              onChange={(value) => {
                if (value === 'create_new') {
                  handleCreateCustomer();
                } else {
                  form.setFieldValue('customerId', value ? Number(value) : 0);
                }
              }}
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
          <NumberInput
            styles={{
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px' },
              input: { width: 160 },
            }}
            hideControls
            label={orderHeaderContent.t(OrderHeaderContentPhrases.ADVANCE_PAYMENT)}
            prefix="₪"
            {...form.getInputProps('amountPaid')}
          />
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.TOTAL)}
            value={<NumberFormatter prefix="₪" value={total} thousandSeparator />}
            separator=": "
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
          {/* <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.TIME)}
            value="Sat 9 Dec - 9:00"
            separator=": "
          /> */}
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.ADDRESS)}
            value={orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_ADDRESS)}
            separator=": "
          />
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.EMAIL)}
            value={orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_EMAIL)}
            separator=": "
          />
          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.PHONE)}
            value={orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_PHONE)}
            separator=": "
          />
        </Stack>
      </Group>
    </Paper>
  );
}
