import { z } from 'zod';

export const BetParticipationSchema = z.object({
  id: z.string(),
  betId: z.string(),
  userId: z.string(),
  type: z.enum(['agree', 'disagree']),
  createdAt: z.date(),
});

export type BetParticipation = z.infer<typeof BetParticipationSchema>;
