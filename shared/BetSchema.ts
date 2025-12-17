import { z } from 'zod';

export const BetSchema = z.object({
  id: z.string(),
  statement: z.string().min(1, 'Statement is required'),
  createdAt: z.date(),
  createdBy: z.string().optional(),
  agreeCount: z.number().int().nonnegative(),
  disagreeCount: z.number().int().nonnegative(),
});

export type Bet = z.infer<typeof BetSchema>;
