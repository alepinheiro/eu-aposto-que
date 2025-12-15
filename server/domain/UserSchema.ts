import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(32),
  displayName: z.string().min(1).max(64),
  avatarUrl: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
