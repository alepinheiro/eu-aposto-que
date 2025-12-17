import { z } from 'zod';

export const BetCommentSchema = z.object({
  id: z.string(),
  betId: z.string(),
  userId: z.string(),
  content: z.string().min(1).max(500),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BetComment = z.infer<typeof BetCommentSchema>;
