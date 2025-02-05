'use client';

import { Button, Divider, Group } from '@mantine/core';

import { useOrderFormContext } from '../order-form/order-form.container';
import { orderFormContent, OrderFormContentPhrases } from '../order-form/order-form.content';

interface OrderFormAddSectionProps {
  isDisabled?: boolean;
}

export default function OrderFormAddSection({ isDisabled }: OrderFormAddSectionProps) {
  const form = useOrderFormContext();

  const addOrderItem = () => {
    form.insertListItem('orderItems', {
      height: null,
      width: null,
      frameId: null,
      passepartoutId: null,
      passepartoutWidth: null,
      glassTypes: {
        transparent: false,
        matte: false,
        none: false,
        perspex: false,
        mirror: false,
      },
      adhesionIds: [],
      printIds: [],
      descriptionIds: [],
      unitPrice: null,
      quantity: 1,
      price: 0,
      image: undefined,
    });
  };

  return (
    <Group gap={56}>
      <Divider flex={1} />
      <Button variant="subtle" color="gray" onClick={addOrderItem} disabled={isDisabled}>
        {orderFormContent.t(OrderFormContentPhrases.ADD_ORDER_ITEM)}
      </Button>
      <Divider flex={1} />
    </Group>
  );
}
