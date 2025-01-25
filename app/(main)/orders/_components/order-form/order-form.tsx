'use client';

import * as z from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import { Stack, Button, Group, Divider } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';

import {
  Frame,
  Print,
  Phone,
  Order,
  Company,
  Address,
  Customer,
  Adhesion,
  Description,
  Passepartout,
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
    address?: Address;
  })[];
  frames: Frame[];
  prints: Print[];
  adhesions: Adhesion[];
  descriptions: Description[];
  passepartouts: Passepartout[];
  isUpdate?: boolean;
  order?: Order;
  company?: Company & {
    phones: Phone[];
    address?: Address;
  };
  isDisabled?: boolean;
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
  company,
  isDisabled,
}: OrderFormProps) {
  const form = useOrderFormContext();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: typeof form.values) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
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
        return {
          ...itemWithoutFile,
          image: item.image === null ? null : item.image,
        };
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
    } finally {
      setIsSubmitting(false);
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
      adhesionIds: [],
      printIds: [],
      descriptionIds: [],
      unitPrice: null,
      quantity: 1,
      price: 0,
      image: undefined,
    });
  };

  const handlePrint = () => {
    if (order?.id) {
      window.open(`/orders/${order.id}/print`, '_blank');
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="sm">
        <OrderHeaderCard
          customers={customers}
          order={order}
          company={
            company
              ? {
                  name: company.name,
                  email: company.email,
                  phones: company.phones.map((phone) => ({
                    number: phone.number,
                    isPrimary: phone.isPrimary,
                  })),
                  address: company.address
                    ? {
                        streetAddress: company.address.streetAddress || undefined,
                        city: company.address.city || undefined,
                      }
                    : undefined,
                }
              : undefined
          }
          disabled={isDisabled}
        />

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
            isRemoveDisabled={form.values.orderItems.length === 1 || isDisabled}
            disabled={isDisabled}
          />
        ))}

        <Group gap={56}>
          <Divider flex={1} />
          <Button variant="subtle" color="gray" onClick={addOrderItem} disabled={isDisabled}>
            {orderFormContent.t(OrderFormContentPhrases.ADD_ORDER_ITEM)}
          </Button>
          <Divider flex={1} />
        </Group>

        <Group justify="flex-end" gap="md">
          <Button variant="default" onClick={() => router.push('/orders')}>
            {orderFormContent.t(OrderFormContentPhrases.CANCEL)}
          </Button>

          {isUpdate && order?.id && (
            <Button
              variant="light"
              leftSection={<IconPrinter size={16} />}
              onClick={handlePrint}
              disabled={isDisabled}
            >
              {orderFormContent.t(OrderFormContentPhrases.PRINT_ORDER)}
            </Button>
          )}

          <Button type="submit" loading={isSubmitting} disabled={isSubmitting || isDisabled}>
            {orderFormContent.t(
              isUpdate ? OrderFormContentPhrases.UPDATE_ORDER : OrderFormContentPhrases.CREATE_ORDER
            )}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
