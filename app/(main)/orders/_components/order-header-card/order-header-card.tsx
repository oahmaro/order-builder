'use client';

import dayjs from 'dayjs';
import { useEffect } from 'react';
import { modals } from '@mantine/modals';
import { Customer, Phone } from '@prisma/client';

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
import { formatPhoneNumber } from '@/utils';
import classes from './order-header-card.module.css';
import { NothingFoundButton } from '@/components/nothing-found-button';
import { CreateCustomerForm } from '@/app/(main)/customers/_components';
import { useOrderFormContext } from '../order-form/order-form.container';
import { orderHeaderContent, OrderHeaderContentPhrases } from './order-header-card.content';
import CustomerFormContainer from '@/app/(main)/customers/_components/customer-form/customer-form.container';

export interface OrderHeaderCardProps {
  customers?: (Customer & { phones: Phone[] })[];
  company?: {
    name: string;
    email: string;
    phones: {
      number: string;
      isPrimary: boolean;
    }[];
    address?: {
      streetAddress?: string;
      city?: string;
    };
  };
  disabled?: boolean;
}

const handleCreateCustomer = () => {
  modals.open({
    title: orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_CUSTOMER),
    size: 'xl',
    closeOnClickOutside: false,
    children: (
      <CustomerFormContainer>
        <CreateCustomerForm />
      </CustomerFormContainer>
    ),
  });
};

export default function OrderHeaderCard({ customers, company, disabled }: OrderHeaderCardProps) {
  const form = useOrderFormContext();

  const customerItems = customers
    ? customers.map((customer) => {
        const phoneNumbers = customer.phones.map((phone) => ({
          formatted: formatPhoneNumber(phone.number),
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
  const formattedPhone = primaryPhone ? formatPhoneNumber(primaryPhone.number) : '—';

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

  const companyPhone = company?.phones?.find((phone) => phone.isPrimary);
  const formattedCompanyPhone = companyPhone
    ? formatPhoneNumber(companyPhone.number)
    : orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_PHONE);

  const companyAddress = company?.address
    ? `${company.address.streetAddress || ''} ${company.address.city || ''}`
    : orderHeaderContent.t(OrderHeaderContentPhrases.PLACEHOLDER_ADDRESS);

  return (
    <Paper className={classes.root} shadow="xs" radius="sm">
      <Group>
        <Stack flex={1} h="100%" gap={4}>
          <Group align="flex-start" gap={0}>
            <Text w={48} fz="sm">
              {orderHeaderContent.t(OrderHeaderContentPhrases.NAME)}
            </Text>

            <Select
              flex={1}
              size="xs"
              clearable
              searchable
              allowDeselect
              spellCheck="false"
              data={customerItems}
              error={form.errors.customerId}
              styles={{ empty: { padding: 0 } }}
              filter={({ options, search }) => {
                const searchTerm = search.toLowerCase().trim();
                return (options as ComboboxItem[]).filter(
                  (item: any) =>
                    item.searchValue?.includes(searchTerm) ||
                    item.label.toLowerCase().includes(searchTerm)
                );
              }}
              value={form.values.customerId ? String(form.values.customerId) : null}
              placeholder={orderHeaderContent.t(OrderHeaderContentPhrases.CUSTOMER_PLACEHOLDER)}
              onChange={(value) => {
                if (value === 'create_new') {
                  handleCreateCustomer();
                } else {
                  form.setFieldValue('customerId', value ? Number(value) : 0);
                }
              }}
              nothingFoundMessage={
                <NothingFoundButton
                  label={orderHeaderContent.t(OrderHeaderContentPhrases.CREATE_NEW_CUSTOMER)}
                  onClick={handleCreateCustomer}
                />
              }
              disabled={disabled}
            />
          </Group>

          <Group gap={0}>
            <Text w={48} fz="sm">
              {orderHeaderContent.t(OrderHeaderContentPhrases.PHONE_NUMBER)}
            </Text>

            <Select
              size="xs"
              flex={1}
              allowDeselect={false}
              value={formattedPhone}
              data={[formattedPhone]}
              disabled={disabled}
            />
          </Group>

          <NumberInput
            size="xs"
            prefix="₪"
            max={total}
            hideControls
            allowLeadingZeros={false}
            rightSectionWidth={40}
            styles={{
              wrapper: { flex: 1 },
              root: { display: 'flex', alignItems: 'center' },
              label: { marginLeft: '8px', width: 48, margin: 0 },
              input: { width: '100%' },
            }}
            label={orderHeaderContent.t(OrderHeaderContentPhrases.ADVANCE_PAYMENT)}
            {...form.getInputProps('amountPaid')}
            disabled={disabled}
          />

          <Box c="dimmed">-----------------------------------</Box>

          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.TOTAL_TO_PAY)}
            value={
              <Box component="span" c="red" fw="bold" fz="sm">
                <NumberFormatter prefix="₪" value={remainingToPay} thousandSeparator />
              </Box>
            }
            separator=": "
          />
        </Stack>

        <Stack flex={2} h="100%" align="center">
          <Box fw="bold">
            <Box component="span" fw="bold">
              {orderHeaderContent.t(OrderHeaderContentPhrases.ORDER_NUMBER)}
            </Box>{' '}
            <Box component="span" c="red.8">
              {form.values?.id ?? '—'}
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
          {form.values?.createdAt && (
            <StaticField
              label={orderHeaderContent.t(OrderHeaderContentPhrases.DATE)}
              value={dayjs(form.values.createdAt).format('DD/MM/YYYY HH:mm')}
              separator=": "
            />
          )}

          <StaticField
            label={orderHeaderContent.t(OrderHeaderContentPhrases.PHONE)}
            value={
              <span style={{ direction: 'ltr', unicodeBidi: 'embed', display: 'inline-block' }}>
                {formattedCompanyPhone}
              </span>
            }
            separator=": "
          />

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
        </Stack>
      </Group>
    </Paper>
  );
}
