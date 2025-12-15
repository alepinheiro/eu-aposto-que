import type { BetEntity } from '~~/server/domain/BetEntity';
import type { BetRepository } from '~~/server/domain/BetRepository';

export class BetService {
  constructor(private readonly betRepository: BetRepository) {}

  async createBet(input: Omit<BetEntity, 'id' | 'agreeCount' | 'disagreeCount'>): Promise<BetEntity> {
    const bet: Omit<BetEntity, 'id'> = {
      ...input,
      agreeCount: 0,
      disagreeCount: 0,
    };
    return this.betRepository.create(bet);
  }

  async getBet(id: string): Promise<BetEntity | null> {
    return this.betRepository.findById(id);
  }

  async agree(id: string): Promise<BetEntity | null> {
    return this.betRepository.agree(id);
  }

  async disagree(id: string): Promise<BetEntity | null> {
    return this.betRepository.disagree(id);
  }
}
