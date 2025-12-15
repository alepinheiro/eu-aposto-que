import type { BetCommentEntity } from '../BetCommentEntity';
import type { BetCommentRepository } from '../BetCommentRepository';

export class BetCommentService {
  constructor(private readonly repo: BetCommentRepository) {}

  async comment(input: Omit<BetCommentEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<BetCommentEntity> {
    return this.repo.create(input);
  }

  async listComments(betId: string): Promise<BetCommentEntity[]> {
    return this.repo.listByBet(betId);
  }

  async updateComment(id: string, content: string): Promise<BetCommentEntity | null> {
    return this.repo.update(id, content);
  }

  async deleteComment(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}
