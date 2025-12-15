// BetReactionEntity represents a user's reaction to a bet
export interface BetReactionEntity {
  id: string;
  betId: string;
  userId: string;
  reaction: string; // e.g. emoji or text
  createdAt: Date;
}
