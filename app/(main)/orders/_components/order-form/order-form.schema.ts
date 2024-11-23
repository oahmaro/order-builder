import { z } from 'zod';
import { OrderStatus } from '@prisma/client';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';

export const orderItemSchema = z.object({
  height: z.coerce
    .number({
      required_error: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
      invalid_type_error: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
    }),
  width: z.coerce
    .number({
      required_error: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
      invalid_type_error: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
    })
    .nullable()
    .refine((val) => val !== null && val >= 1, {
      message: orderFormContent.t(OrderFormContentPhrases.DIMENSIONS_REQUIRED),
    }),
  frameId: z.coerce.number().nullable(),
  passepartoutNum: z.coerce.number().nullable(),
  passepartoutWidth: z.coerce.number().nullable(),
  glassTypes: z.object({
    transparent: z.boolean().default(false),
    matte: z.boolean().default(false),
    none: z.boolean().default(false),
    perspex: z.boolean().default(false),
    mirror: z.boolean().default(false),
  }),
  adhesionId: z.coerce.number().optional(),
  printId: z.coerce.number().optional(),
  descriptionId: z.coerce.number().optional(),
  notes: z.string().optional(),
  image: z.string().nullable().optional(),
  imageFile: z.any().optional(),
  unitPrice: z.coerce
    .number()
    .min(0.01, orderFormContent.t(OrderFormContentPhrases.UNIT_PRICE_REQUIRED)),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
});

export const orderFormSchema = z.object({
  customerId: z
    .number({
      required_error: orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED),
      invalid_type_error: orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED),
    })
    .min(1, orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED)),
  amountPaid: z.coerce.number().min(0),
  status: z.nativeEnum(OrderStatus).default('NEW'),
  orderItems: z.array(orderItemSchema).min(1),
});
