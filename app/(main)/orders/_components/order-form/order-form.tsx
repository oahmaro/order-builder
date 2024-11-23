'use client';

import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { Stack, Button, Group, Divider } from '@mantine/core';

import {
  Customer,
  Frame,
  Print,
  Adhesion,
  Description,
  Phone,
  Passepartout,
  Order,
} from '@prisma/client';

import { OrderItemCard } from '../order-item-card';
import { orderFormSchema } from './order-form.schema';
import { OrderHeaderCard } from '../order-header-card';
import { commonContent, CommonPhrases } from '@/content';
import { useOrderFormContext } from './order-form.container';
import { createOrderAction, updateOrderAction } from '../../_actions';
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
  isUpdate?: boolean;
  order?: Order;
}

export default function OrderForm({
  customers,
  frames,
  prints,
  adhesions,
  descriptions,
  passepartouts,
  isUpdate,
  order,
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

      const validatedData = orderFormSchema.parse(values);
      const formData = new FormData();

      if (isUpdate && order?.id) {
        formData.append('orderId', order.id.toString());
      }

      // Add basic order data
      formData.append('customerId', validatedData.customerId.toString());
      formData.append('amountPaid', validatedData.amountPaid.toString());
      formData.append('status', validatedData.status);

      // Handle order items and their images separately
      const orderItemsWithoutFiles = validatedData.orderItems.map((item) => {
        const { imageFile, ...itemWithoutFile } = item;
        return itemWithoutFile;
      });

      formData.append('orderItems', JSON.stringify(orderItemsWithoutFiles));

      // Append image files separately
      validatedData.orderItems.forEach((item, index) => {
        if (item.imageFile) {
          formData.append(`orderItem${index}Image`, item.imageFile);
        }
      });

      const response = await (isUpdate ? updateOrderAction(formData) : createOrderAction(formData));

      if (
        response.message === orderFormContent.t(OrderFormContentPhrases.ORDER_CREATED) ||
        response.message === orderFormContent.t(OrderFormContentPhrases.ORDER_UPDATED)
      ) {
        notifications.show({
          title: commonContent.t(CommonPhrases.SUCCESS),
          message: response.message,
          color: 'green',
        });
        form.resetDirty();
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
        error.errors.forEach((err) => {
          const fieldName = err.path.join('.');
          form.setFieldError(fieldName, err.message);
        });
      } else {
        notifications.show({
          title: commonContent.t(CommonPhrases.ERROR),
          message: orderFormContent.t(OrderFormContentPhrases.ERROR_WHILE_UPDATING),
          color: 'red',
        });
      }
    }
  };

  const addOrderItem = () => {
    form.insertListItem('orderItems', {
      height: null,
      width: null,
      frameId: null,
      passepartoutNum: null,
      passepartoutWidth: null,
      glassTypes: {
        transparent: false,
        matte: false,
        none: false,
        perspex: false,
        mirror: false,
      },
      unitPrice: null,
      quantity: 1,
      price: 0,
      image: undefined,
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

        <Group justify="flex-end" gap="md">
          <Button variant="default" onClick={() => router.push('/orders')}>
            {orderFormContent.t(OrderFormContentPhrases.CANCEL)}
          </Button>
          <Button type="submit">
            {orderFormContent.t(
              isUpdate ? OrderFormContentPhrases.UPDATE_ORDER : OrderFormContentPhrases.CREATE_ORDER
            )}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
