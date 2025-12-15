import type { BetOutcomeEntity } from '../BetOutcomeEntity';
import type { BetOutcomeRepository } from '../BetOutcomeRepository';

export class BetOutcomeService {
  constructor(private readonly repo: BetOutcomeRepository) {}

  async createOutcome(input: Omit<BetOutcomeEntity, 'id' | 'createdAt'>): Promise<BetOutcomeEntity> {
    return this.repo.create(input);
  }

  async getOutcomeByBetId(betId: string): Promise<BetOutcomeEntity | null> {
    return this.repo.findByBetId(betId);
  }

  async resolveBet(betId: string, outcome: 'yes' | 'no' | 'cancelled', resolvedBy: string): Promise<BetOutcomeEntity | null> {
    return this.repo.resolve(betId, outcome, resolvedBy);
  }
}
