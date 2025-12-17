import { ObjectId } from 'mongodb';
import type { UserEntity } from '~~/server/domain/UserEntity';
import type { UserRepository } from '~~/server/domain/UserRepository';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import { UserSchema } from '~~/shared/UserSchema';

const COLLECTION = 'users';

export class MongoUserRepository implements UserRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(user: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity> {
    const now = new Date();
    const doc = {
      ...user,
      createdAt: now,
      updatedAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async findById(id: string): Promise<UserEntity | null> {
    const doc = await (await this.collection()).findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return this.map(doc);
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const doc = await (await this.collection()).findOne({ username });
    if (!doc) return null;
    return this.map(doc);
  }

  async update(id: string, data: Partial<Omit<UserEntity, 'id' | 'createdAt'>>): Promise<UserEntity | null> {
    const update = {
      ...data,
      updatedAt: new Date(),
    };
    const result = await (await this.collection()).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' },
    );
    if (!result?.value) return null;
    return this.map(result.value);
  }

  private map(doc: unknown): UserEntity {
    const parsed = UserSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid user document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the users collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ username: 1 }, { unique: true });
    await collection.createIndex({ createdAt: -1 });
  }
}
