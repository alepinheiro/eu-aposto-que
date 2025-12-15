import type { BetReactionEntity } from './BetReactionEntity';

export interface BetReactionRepository {
  create(reaction: Omit<BetReactionEntity, 'id' | 'createdAt'>): Promise<BetReactionEntity>;
  listByBet(betId: string): Promise<BetReactionEntity[]>;
  countByBet(betId: string): Promise<number>;
}
