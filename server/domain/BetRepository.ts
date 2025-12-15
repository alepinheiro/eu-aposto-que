import type { BetEntity } from '~~/server/domain/BetEntity';

export interface BetRepository {
  create(bet: Omit<BetEntity, 'id'>): Promise<BetEntity>;
  findById(id: string): Promise<BetEntity | null>;
  agree(id: string): Promise<BetEntity | null>;
  disagree(id: string): Promise<BetEntity | null>;
  getFeed(limit?: number, skip?: number): Promise<BetEntity[]>;
}
