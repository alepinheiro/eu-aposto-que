import { ObjectId } from 'mongodb';
import type { BetEntity } from '~~/server/domain/BetEntity';
import type { BetRepository } from '~~/server/domain/BetRepository';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';

export class MongoBetRepository implements BetRepository {
  private collectionName = 'bets';

  async create(bet: Omit<BetEntity, 'id'>): Promise<BetEntity> {
    const db = await getMongoDb();
    const result = await db.collection(this.collectionName).insertOne({
      ...bet,
      agreeCount: 0,
      disagreeCount: 0,
    });
    return {
      ...bet,
      id: result.insertedId.toHexString(),
      agreeCount: 0,
      disagreeCount: 0,
    };
  }

  async findById(id: string): Promise<BetEntity | null> {
    const db = await getMongoDb();
    const doc = await db.collection(this.collectionName).findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return this.map(doc);
  }

  async agree(id: string): Promise<BetEntity | null> {
    const db = await getMongoDb();
    const result = await db.collection(this.collectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { agreeCount: 1 } },
      { returnDocument: 'after' },
    );
    return result?.value ? this.map(result.value) : null;
  }

  async disagree(id: string): Promise<BetEntity | null> {
    const db = await getMongoDb();
    const result = await db.collection(this.collectionName).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { disagreeCount: 1 } },
      { returnDocument: 'after' },
    );
    return result?.value ? this.map(result.value) : null;
  }

  private map(doc: any): BetEntity {
    return {
      id: doc._id.toHexString(),
      statement: doc.statement,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy,
      agreeCount: doc.agreeCount,
      disagreeCount: doc.disagreeCount,
    };
  }

  async getFeed(limit = 20, skip = 0): Promise<BetEntity[]> {
    const db = await getMongoDb();
    const pipeline = [
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ];
    const docs = await db.collection(this.collectionName).aggregate(pipeline).toArray();
    return docs.map(this.map);
  }
}
