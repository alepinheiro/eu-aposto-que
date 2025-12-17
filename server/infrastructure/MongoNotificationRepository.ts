import { ObjectId } from 'mongodb';
import type { NotificationEntity } from '~~/server/domain/NotificationEntity';
import type { NotificationRepository } from '~~/server/domain/NotificationRepository';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import { NotificationSchema } from '~~/shared/NotificationSchema';

const COLLECTION = 'notifications';

export class MongoNotificationRepository implements NotificationRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<NotificationEntity, 'id' | 'createdAt' | 'read'>): Promise<NotificationEntity> {
    const now = new Date();
    const doc = {
      ...input,
      read: false,
      createdAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async listByUser(userId: string): Promise<NotificationEntity[]> {
    const docs = await (await this.collection()).find({ userId }).sort({ createdAt: -1 }).toArray();
    return docs.map(this.map);
  }

  async markAsRead(id: string): Promise<NotificationEntity | null> {
    const result = await (await this.collection()).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { read: true } },
      { returnDocument: 'after' },
    );
    if (!result.value) return null;
    return this.map(result.value);
  }

  private map(doc: any): NotificationEntity {
    const parsed = NotificationSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid notification document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the notifications collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ userId: 1, createdAt: -1 });
    await collection.createIndex({ read: 1 });
    await collection.createIndex({ type: 1 });
  }
}
