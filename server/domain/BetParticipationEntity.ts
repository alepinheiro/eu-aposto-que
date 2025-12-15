// BetParticipationEntity represents a user's participation (agree/disagree) in a bet
export interface BetParticipationEntity {
  id: string;
  betId: string;
  userId: string;
  type: 'agree' | 'disagree';
  createdAt: Date;
}
