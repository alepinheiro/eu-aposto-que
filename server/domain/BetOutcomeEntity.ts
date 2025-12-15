// BetOutcomeEntity represents the resolution status of a bet
export interface BetOutcomeEntity {
  id: string;
  betId: string;
  resolvedBy: string; // userId
  outcome: 'pending' | 'yes' | 'no' | 'cancelled';
  resolvedAt?: Date;
  createdAt: Date;
}
