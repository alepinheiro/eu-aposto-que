import type { BetReactionEntity } from '../BetReactionEntity';
import type { BetReactionRepository } from '../BetReactionRepository';

export class BetReactionService {
  constructor(private readonly repo: BetReactionRepository) {}

  async react(input: Omit<BetReactionEntity, 'id' | 'createdAt'>): Promise<BetReactionEntity> {
    return this.repo.create(input);
  }

  async listReactions(betId: string): Promise<BetReactionEntity[]> {
    return this.repo.listByBet(betId);
  }

  async countReactions(betId: string): Promise<number> {
    return this.repo.countByBet(betId);
  }
}
