import { z } from 'zod';

export const GroupSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(64),
  description: z.string().max(256).optional(),
  ownerId: z.string(),
  memberIds: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Group = z.infer<typeof GroupSchema>;
