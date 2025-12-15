// BetCommentEntity represents a user's comment on a bet
export interface BetCommentEntity {
  id: string;
  betId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
