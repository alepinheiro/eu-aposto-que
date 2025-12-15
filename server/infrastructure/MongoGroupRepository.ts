import { ObjectId } from 'mongodb';
import type { GroupEntity } from '~~/server/domain/GroupEntity';
import type { GroupRepository } from '~~/server/domain/GroupRepository';
import { GroupSchema } from '~~/server/domain/GroupSchema';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';

const COLLECTION = 'groups';

export class MongoGroupRepository implements GroupRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<GroupEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<GroupEntity> {
    const now = new Date();
    const doc = {
      ...input,
      memberIds: [input.ownerId],
      createdAt: now,
      updatedAt: now,
    };
    const result = await (await this.collection()).insertOne(doc);
    return {
      ...doc,
      id: result.insertedId.toHexString(),
    };
  }

  async findById(id: string): Promise<GroupEntity | null> {
    const doc = await (await this.collection()).findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return this.map(doc);
  }

  async listByUser(userId: string): Promise<GroupEntity[]> {
    const docs = await (await this.collection()).find({ memberIds: userId }).toArray();
    return docs.map(this.map);
  }

  async addMember(groupId: string, userId: string): Promise<GroupEntity | null> {
    const now = new Date();
    const result = await (await this.collection()).findOneAndUpdate(
      { _id: new ObjectId(groupId) },
      { $addToSet: { memberIds: userId }, $set: { updatedAt: now } },
      { returnDocument: 'after' },
    );
    if (!result?.value) return null;
    return this.map(result.value);
  }

  async removeMember(groupId: string, userId: string): Promise<GroupEntity | null> {
    const now = new Date();
    const result = await (await this.collection()).findOneAndUpdate(
      { _id: new ObjectId(groupId) },
      { $pull: { memberIds: userId }, $set: { updatedAt: now } },
      { returnDocument: 'after' },
    );
    if (!result.value) return null;
    return this.map(result.value);
  }

  private map(doc: any): GroupEntity {
    const parsed = GroupSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
    });
    if (!parsed.success) throw new Error('Invalid group document');
    return parsed.data;
  }

  /**
   * Ensure indexes for the groups collection
   */
  static async ensureIndexes() {
    const client = await getMongoDb();
    const collection = client.collection(COLLECTION);
    await collection.createIndex({ ownerId: 1 });
    await collection.createIndex({ memberIds: 1 });
    await collection.createIndex({ createdAt: -1 });
  }
}
