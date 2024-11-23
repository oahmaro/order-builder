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
} from '@mantine/core';
import { useEffect } from 'react';

import { StaticField } from '@/components';
import classes from './order-header-card.module.css';
import { useOrderFormContext } from '../order-form/order-form.container';
import { orderHeaderContent, OrderHeaderContentPhrases } from './order-header-card.content';

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

export default function OrderHeaderCard({ order, customers }: OrderHeaderCardProps) {
  const form = useOrderFormContext();

  const customerItems = customers
    ? customers.map((customer) => ({
        label: `${customer.firstName} ${customer.lastName}`,
        value: String(customer.id),
      }))
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
              data={customerItems}
              nothingFoundMessage={orderHeaderContent.t(OrderHeaderContentPhrases.NOTHING_FOUND)}
              {...form.getInputProps('customerId')}
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
