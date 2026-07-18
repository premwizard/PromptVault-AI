import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  color: z.string().optional(),
  icon: z.string().optional(),
  order: z.number().int().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();
