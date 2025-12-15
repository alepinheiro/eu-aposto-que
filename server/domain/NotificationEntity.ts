// NotificationEntity represents a basic notification for a user
export interface NotificationEntity {
  id: string;
  userId: string;
  type: 'bet_comment' | 'bet_reaction' | 'bet_resolved' | 'group_invite';
  refId: string; // e.g. betId, commentId, groupId
  message: string;
  read: boolean;
  createdAt: Date;
}
