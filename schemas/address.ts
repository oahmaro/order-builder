import { z } from 'zod';

export const addressSchema = z.object({
  id: z.number().optional(),
  country: z.string().optional(),
  streetAddress: z.string().optional(),
  aptSuite: z.string().optional(),
  city: z.string().optional(),
  stateProvince: z.string().optional(),
  postalCode: z.string().optional(),
});
