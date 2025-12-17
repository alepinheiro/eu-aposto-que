import type { ObjectId } from 'mongodb';

// BetEntity represents the core domain model for a Bet
export interface BetEntity {
  id: string;
  statement: string;
  createdAt: Date;
  createdBy: ObjectId | string;
  agreeCount: number;
  disagreeCount: number;
}
