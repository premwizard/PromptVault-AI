import { z } from 'zod';

export const createPromptSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(1000),
  content: z.string().min(1, 'Content is required'),
  aiModel: z.string().min(1, 'AI Model is required'),
  categoryId: z.string().uuid().optional(),
  collectionId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['Draft', 'Published', 'Archived']).default('Published'),
});

export const updatePromptSchema = createPromptSchema.partial();
