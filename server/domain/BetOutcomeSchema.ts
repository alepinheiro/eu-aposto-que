import { z } from 'zod';

export const BetOutcomeSchema = z.object({
  id: z.string(),
  betId: z.string(),
  resolvedBy: z.string(),
  outcome: z.enum(['pending', 'yes', 'no', 'cancelled']),
  resolvedAt: z.date().optional(),
  createdAt: z.date(),
});

export type BetOutcome = z.infer<typeof BetOutcomeSchema>;
