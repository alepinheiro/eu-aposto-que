import type { BetOutcomeEntity } from '~~/server/domain/BetOutcomeEntity';
import type { BetOutcomeRepository } from '~~/server/domain/BetOutcomeRepository';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import { BetOutcomeSchema } from '~~/shared/BetOutcomeSchema';

const COLLECTION = 'bet_outcomes';

export class MongoBetOutcomeRepository implements BetOutcomeRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<BetOutcomeEntity, 'id' | 'createdAt'>): Promise<BetOutcomeEntity> {
    const now = new Date();
    const doc = {
      ...input,
      outcome: 'pending',
      createdAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async findByBetId(betId: string): Promise<BetOutcomeEntity | null> {
    const doc = await (await this.collection()).findOne({ betId });
    if (!doc) return null;
    return this.map(doc);
  }

  async resolve(betId: string, outcome: 'yes' | 'no' | 'cancelled', resolvedBy: string): Promise<BetOutcomeEntity | null> {
    const now = new Date();
    const result = await (await this.collection()).findOneAndUpdate(
      { betId },
      { $set: { outcome, resolvedBy, resolvedAt: now } },
      { returnDocument: 'after' },
    );
    if (!result?.value) return null;
    return this.map(result.value);
  }

  private map(doc: any): BetOutcomeEntity {
    const parsed = BetOutcomeSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid bet outcome document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the bet_outcomes collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ betId: 1 }, { unique: true });
    await collection.createIndex({ outcome: 1 });
    await collection.createIndex({ createdAt: -1 });
  }
}
