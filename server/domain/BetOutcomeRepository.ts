import type { BetOutcomeEntity } from './BetOutcomeEntity';

export interface BetOutcomeRepository {
  create(outcome: Omit<BetOutcomeEntity, 'id' | 'createdAt'>): Promise<BetOutcomeEntity>;
  findByBetId(betId: string): Promise<BetOutcomeEntity | null>;
  resolve(betId: string, outcome: 'yes' | 'no' | 'cancelled', resolvedBy: string): Promise<BetOutcomeEntity | null>;
}
