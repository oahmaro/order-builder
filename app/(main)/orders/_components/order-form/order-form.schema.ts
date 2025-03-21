import { z } from 'zod';
import { OrderStatus } from '@prisma/client';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';

export const orderItemSchema = z.object({
  id: z.number().optional(),
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
  passepartoutId: z.coerce.number().nullable(),
  passepartoutWidth: z.coerce.number().nullable(),
  glassTypes: z.object({
    transparent: z.boolean().default(false),
    matte: z.boolean().default(false),
    none: z.boolean().default(false),
    perspex: z.boolean().default(false),
    mirror: z.boolean().default(false),
  }),
  adhesionIds: z.array(z.coerce.number()).optional(),
  printIds: z.array(z.coerce.number()).optional(),
  descriptionIds: z.array(z.coerce.number()).optional(),
  notes: z
    .string()
    .max(45, orderFormContent.t(OrderFormContentPhrases.NOTES_MAX_LENGTH))
    .optional(),
  image: z.string().nullable().optional(),
  imageFile: z.any().optional(),
  unitPrice: z.coerce
    .number()
    .min(0.01, orderFormContent.t(OrderFormContentPhrases.UNIT_PRICE_REQUIRED)),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
});

export const orderFormSchema = z.object({
  id: z.number().optional(),
  customerId: z
    .number({
      required_error: orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED),
      invalid_type_error: orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED),
    })
    .min(1, orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED)),
  amountPaid: z.coerce.number().min(0),
  status: z.nativeEnum(OrderStatus).default('NEW'),
  orderItems: z.array(orderItemSchema).min(1),
  createdAt: z.string().optional(),
});
