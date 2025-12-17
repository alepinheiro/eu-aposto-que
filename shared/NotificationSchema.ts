import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['bet_comment', 'bet_reaction', 'bet_resolved', 'group_invite']),
  refId: z.string(),
  message: z.string().min(1).max(256),
  read: z.boolean(),
  createdAt: z.date(),
});

export type Notification = z.infer<typeof NotificationSchema>;
