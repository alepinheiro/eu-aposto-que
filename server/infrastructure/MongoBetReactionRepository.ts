import type { BetReactionEntity } from '~~/server/domain/BetReactionEntity';
import type { BetReactionRepository } from '~~/server/domain/BetReactionRepository';
import { BetReactionSchema } from '~~/server/domain/BetReactionSchema';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';

const COLLECTION = 'bet_reactions';

export class MongoBetReactionRepository implements BetReactionRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<BetReactionEntity, 'id' | 'createdAt'>): Promise<BetReactionEntity> {
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

  async listByBet(betId: string): Promise<BetReactionEntity[]> {
    const docs = await (await this.collection()).find({ betId }).toArray();
    return docs.map(this.map);
  }

  async countByBet(betId: string): Promise<number> {
    return (await (await this.collection()).countDocuments({ betId }));
  }

  private map(doc: any): BetReactionEntity {
    const parsed = BetReactionSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid bet reaction document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the bet_reactions collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ betId: 1 });
    await collection.createIndex({ betId: 1, userId: 1 });
    await collection.createIndex({ createdAt: -1 });
  }
}
