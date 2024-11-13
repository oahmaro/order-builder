'use client';

import { notifications } from '@mantine/notifications';
import { Stack, Button, Group, Divider } from '@mantine/core';
import { Customer, Frame, Print, Adhesion, Description, Phone, Passepartout } from '@prisma/client';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { OrderItemCard } from '../order-item-card';
import { createOrderAction } from '../../_actions';
import { orderFormSchema } from './order-form.schema';
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
  passepartouts: Passepartout[];
}

export default function OrderForm({
  customers,
  frames,
  prints,
  adhesions,
  descriptions,
  passepartouts,
}: OrderFormProps) {
  const form = useOrderFormContext();
  const router = useRouter();

  const handleSubmit = async (values: typeof form.values) => {
    try {
      if (!values.customerId) {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED),
          color: 'red',
        });
        return;
      }

      console.log('Form values before validation:', values);

      const validatedData = orderFormSchema.parse(values);

      console.log('Validated data:', validatedData);

      const formData = new FormData();

      formData.append('customerId', validatedData.customerId.toString());
      formData.append('amountPaid', validatedData.amountPaid.toString());
      formData.append('status', validatedData.status);
      formData.append('orderItems', JSON.stringify(validatedData.orderItems));

      const response = await createOrderAction(formData);

      console.log('Server response:', response);

      if (response.message === orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED)) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
        router.push('/orders');
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: response.message,
          color: 'red',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Zod validation errors:', error.errors);
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          form.setFieldError(fieldName, err.message);
        });
      } else {
        console.error('Unexpected error:', error);
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_CREATING),
          color: 'red',
        });
      }
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
            passepartouts={passepartouts}
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
