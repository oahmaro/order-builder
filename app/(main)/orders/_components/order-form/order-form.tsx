'use client';

import { Stack, Button, Group, Divider } from '@mantine/core';
import { Customer, Frame, Print, Adhesion, Description, Phone } from '@prisma/client';
import { notifications } from '@mantine/notifications';

import { OrderItemCard } from '../order-item-card';
import { OrderHeaderCard } from '../order-header-card';
import { commonContent, CommonPhrases } from '@/content';
import { useOrderFormContext } from './order-form.container';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';

interface OrderFormProps {
  customers: (Customer & {
    phones: Phone[];
  })[];
  frames: Frame[];
  prints: Print[];
  adhesions: Adhesion[];
  descriptions: Description[];
}

export default function OrderForm({
  customers,
  frames,
  prints,
  adhesions,
  descriptions,
}: OrderFormProps) {
  const form = useOrderFormContext();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!values.customerId) {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: 'Please select a customer',
          color: 'red',
        });
        return;
      }

      console.log(values);
      // Handle form submission
      notifications.show({
        title: commonContent.t(CommonPhrases.SUCCESS),
        message: orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED),
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: commonContent.t(CommonPhrases.ERROR),
        message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_CREATING),
        color: 'red',
      });
    }
  };

  const addOrderItem = () => {
    form.insertListItem('orderItems', {
      height: 0,
      width: 0,
      frameId: 0,
      passepartoutNum: 0,
      passepartoutWidth: 0,
      glassTypes: {
        transparent: false,
        matte: false,
        none: false,
        perspex: false,
        mirror: false,
      },
      unitPrice: 0,
      quantity: 1,
      price: 0,
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="lg">
        <OrderHeaderCard customers={customers} />

        {form.values.orderItems.map((_, index) => (
          <OrderItemCard
            key={index}
            index={index}
            frames={frames}
            prints={prints}
            adhesions={adhesions}
            descriptions={descriptions}
            onRemove={() => form.removeListItem('orderItems', index)}
            isRemoveDisabled={form.values.orderItems.length === 1}
          />
        ))}

        <Group gap={56}>
          <Divider flex={1} />
          <Button variant="subtle" color="gray" onClick={addOrderItem}>
            {orderFormContent.t(OrderFormContentPhrases.ADD_ORDER_ITEM)}
          </Button>
          <Divider flex={1} />
        </Group>

        <Group justify="flex-end">
          <Button type="submit">{orderFormContent.t(OrderFormContentPhrases.CREATE_ORDER)}</Button>
        </Group>
      </Stack>
    </form>
  );
}
