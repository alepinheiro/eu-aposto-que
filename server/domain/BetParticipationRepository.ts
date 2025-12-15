import type { BetParticipationEntity } from './BetParticipationEntity';

export interface BetParticipationRepository {
  create(participation: Omit<BetParticipationEntity, 'id' | 'createdAt'>): Promise<BetParticipationEntity>;
  findByBetAndUser(betId: string, userId: string): Promise<BetParticipationEntity | null>;
  countByBet(betId: string): Promise<{ agree: number; disagree: number }>;
  listByBet(betId: string): Promise<BetParticipationEntity[]>;
}
