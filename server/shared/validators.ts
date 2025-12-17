import { z } from 'zod';

export const createBetInputSchema = z.object({
  statement: z.string().min(1, 'Statement is required'),
  createdBy: z.string().optional(),
});

export const betIdParamSchema = z.object({
  id: z.string(),
});
