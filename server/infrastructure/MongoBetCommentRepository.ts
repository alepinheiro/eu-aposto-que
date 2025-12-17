import { ObjectId } from 'mongodb';
import type { BetCommentEntity } from '~~/server/domain/BetCommentEntity';
import type { BetCommentRepository } from '~~/server/domain/BetCommentRepository';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import { BetCommentSchema } from '~~/shared/BetCommentSchema';

const COLLECTION = 'bet_comments';

export class MongoBetCommentRepository implements BetCommentRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<BetCommentEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<BetCommentEntity> {
    const now = new Date();
    const doc = {
      ...input,
      createdAt: now,
      updatedAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async listByBet(betId: string): Promise<BetCommentEntity[]> {
    const docs = await (await this.collection()).find({ betId }).sort({ createdAt: 1 }).toArray();
    return docs.map(this.map);
  }

  async update(id: string, content: string): Promise<BetCommentEntity | null> {
    const now = new Date();
    const result = await (await this.collection()).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { content, updatedAt: now } },
      { returnDocument: 'after' },
    );
    if (!result?.value) return null;
    return this.map(result.value);
  }

  async delete(id: string): Promise<boolean> {
    const result = await (await this.collection()).deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }

  private map(doc: any): BetCommentEntity {
    const parsed = BetCommentSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid bet comment document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the bet_comments collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ betId: 1, createdAt: 1 });
    await collection.createIndex({ userId: 1 });
    await collection.createIndex({ createdAt: -1 });
  }
}
