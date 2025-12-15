import type { BetCommentEntity } from './BetCommentEntity';

export interface BetCommentRepository {
  create(comment: Omit<BetCommentEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<BetCommentEntity>;
  listByBet(betId: string): Promise<BetCommentEntity[]>;
  update(id: string, content: string): Promise<BetCommentEntity | null>;
  delete(id: string): Promise<boolean>;
}
