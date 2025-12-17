import { z } from 'zod';

export const betDetailsQuerySchema = z.object({
  includeComments: z.coerce.boolean().optional(),
  includeParticipations: z.coerce.boolean().optional(),
  includeReactions: z.coerce.boolean().optional(),
});
