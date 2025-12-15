import type { BetParticipationEntity } from '../BetParticipationEntity';
import type { BetParticipationRepository } from '../BetParticipationRepository';

export class BetParticipationService {
  constructor(private readonly repo: BetParticipationRepository) {}

  async participate(input: Omit<BetParticipationEntity, 'id' | 'createdAt'>): Promise<BetParticipationEntity> {
    return this.repo.create(input);
  }

  async getParticipation(betId: string, userId: string): Promise<BetParticipationEntity | null> {
    return this.repo.findByBetAndUser(betId, userId);
  }

  async getParticipationCounts(betId: string): Promise<{ agree: number; disagree: number }> {
    return this.repo.countByBet(betId);
  }

  async listParticipations(betId: string): Promise<BetParticipationEntity[]> {
    return this.repo.listByBet(betId);
  }
}
