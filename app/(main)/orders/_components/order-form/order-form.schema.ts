import { z } from 'zod';
import { OrderStatus } from '@prisma/client';
import { orderFormContent, OrderFormContentPhrases } from './order-form.content';

export const orderItemSchema = z.object({
  height: z.coerce.number().min(1).max(999),
  width: z.coerce.number().min(1).max(999),
  frameId: z.coerce.number().optional(),
  passepartoutNum: z.coerce.number().optional(),
  passepartoutWidth: z.coerce.number().optional(),
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
  image: z.string().optional(),
  imageFile: z.any().optional(),
  unitPrice: z.coerce
    .number()
    .min(0.01, orderFormContent.t(OrderFormContentPhrases.UNIT_PRICE_REQUIRED)),
  quantity: z.coerce.number().min(1),
  price: z.coerce.number().min(0),
});

export const orderFormSchema = z.object({
  customerId: z
    .union([
      z.string().min(1, orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED)),
      z.number().min(1, orderFormContent.t(OrderFormContentPhrases.CUSTOMER_REQUIRED)),
    ])
    .transform((val) => Number(val)),
  amountPaid: z.coerce.number().min(0),
  status: z.nativeEnum(OrderStatus).default('PENDING'),
  orderItems: z.array(orderItemSchema).min(1),
});
