'use client';

import { Accordion } from '@mantine/core';
import { Frame, Print, Adhesion, Description, Passepartout } from '@prisma/client';
import { useState, useEffect } from 'react';

import classes from './order-items.module.css';
import { OrderItemCard } from '../order-item-card';
import { useOrderFormContext } from '../order-form/order-form.container';

interface OrderItemsProps {
  frames: Frame[];
  prints: Print[];
  isDisabled?: boolean;
  adhesions: Adhesion[];
  descriptions: Description[];
  passepartouts: Passepartout[];
}

export default function OrderItems({
  frames,
  prints,
  adhesions,
  isDisabled,
  descriptions,
  passepartouts,
}: OrderItemsProps) {
  const form = useOrderFormContext();
  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    setOpenItems(form.values.orderItems.map((_, index) => `item-${index}`));
  }, [form.values.orderItems.length]);

  const items = form.values.orderItems.map((_, index) => (
    <OrderItemCard
      key={index}
      index={index}
      frames={frames}
      prints={prints}
      adhesions={adhesions}
      descriptions={descriptions}
      passepartouts={passepartouts}
      disabled={isDisabled}
      onRemove={() => form.removeListItem('orderItems', index)}
      isRemoveDisabled={form.values.orderItems.length === 1}
    />
  ));

  return (
    <Accordion
      multiple
      value={openItems}
      variant="separated"
      onChange={setOpenItems}
      classNames={{ root: classes.root, item: classes.item }}
    >
      {items}
    </Accordion>
  );
}
