import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import type { BetParticipationEntity } from '../domain/BetParticipationEntity';
import type { BetParticipationRepository } from '../domain/BetParticipationRepository';
import { BetParticipationSchema } from '../domain/BetParticipationSchema';

const COLLECTION = 'bet_participations';

export class MongoBetParticipationRepository implements BetParticipationRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<BetParticipationEntity, 'id' | 'createdAt'>): Promise<BetParticipationEntity> {
    const now = new Date();
    const doc = {
      ...input,
      createdAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async findByBetAndUser(betId: string, userId: string): Promise<BetParticipationEntity | null> {
    const doc = await (await this.collection()).findOne({ betId, userId });
    if (!doc) return null;
    return this.map(doc);
  }

  async countByBet(betId: string): Promise<{ agree: number; disagree: number }> {
    const pipeline = [
      { $match: { betId } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ];
    const results = await (await this.collection()).aggregate(pipeline).toArray();
    let agree = 0, disagree = 0;
    for (const r of results) {
      if (r._id === 'agree') agree = r.count;
      if (r._id === 'disagree') disagree = r.count;
    }
    return { agree, disagree };
  }

  async listByBet(betId: string): Promise<BetParticipationEntity[]> {
    const docs = await (await this.collection()).find({ betId }).toArray();
    return docs.map(this.map);
  }

  private map(doc: any): BetParticipationEntity {
    const parsed = BetParticipationSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid bet participation document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the bet_participations collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ betId: 1, userId: 1 }, { unique: true });
    await collection.createIndex({ betId: 1, type: 1 });
    await collection.createIndex({ createdAt: -1 });
  }
}
