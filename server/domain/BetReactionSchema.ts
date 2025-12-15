import { z } from 'zod';

export const BetReactionSchema = z.object({
  id: z.string(),
  betId: z.string(),
  userId: z.string(),
  reaction: z.string().min(1).max(32),
  createdAt: z.date(),
});

export type BetReaction = z.infer<typeof BetReactionSchema>;
