import { ObjectId } from 'mongodb';
import { getMongoDb } from '~~/server/infrastructure/database/mongoClient';
import { BetParticipationSchema } from '../../shared/BetParticipationSchema';
import type { BetParticipationEntity } from '../domain/BetParticipationEntity';
import type { BetParticipationRepository } from '../domain/BetParticipationRepository';

const COLLECTION = 'bet_participations';

export class MongoBetParticipationRepository implements BetParticipationRepository {
  private async collection() {
    const client = await getMongoDb();
    return client.collection(COLLECTION);
  }

  async create(input: Omit<BetParticipationEntity, 'id' | 'createdAt'>): Promise<BetParticipationEntity> {
    const collection = await this.collection();
    const result = await collection.insertOne({
      ...input,
      userId: new ObjectId(input.userId),
      betId: new ObjectId(input.betId),
      createdAt: new Date(),
    });
    return this.map(result);
  }

  async findByBetAndUser(betId: string, userId: string): Promise<BetParticipationEntity | null> {
    const collection = await this.collection();
    const doc = await collection.findOne({
      betId: new ObjectId(betId),
      userId: new ObjectId(userId),
    });
    if (!doc) return null;
    return this.map(doc);
  }

  async countByBet(betId: string): Promise<{ agree: number; disagree: number }> {
    const pipeline = [
      { $match: { betId } },
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ];
    const collection = await this.collection();
    const results = await collection.aggregate(pipeline).toArray();
    let agree = 0, disagree = 0;
    for (const r of results) {
      if (r._id === 'agree') agree = r.count;
      if (r._id === 'disagree') disagree = r.count;
    }
    return { agree, disagree };
  }

  async listByBet(betId: string): Promise<BetParticipationEntity[]> {
    const collection = await this.collection();
    const docs = await collection.find({ betId: new ObjectId(betId) }).toArray();
    return docs.map(this.map);
  }

  private map(doc: any): BetParticipationEntity {
    const parsed = BetParticipationSchema.safeParse({
      ...doc,
      id: doc._id?.toHexString() || doc.id,
      betId: typeof doc.betId === 'string' ? doc.betId : doc.betId.toHexString(),
      userId: typeof doc.userId === 'string' ? doc.userId : doc.userId.toHexString(),
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

  async updateType(id: string, type: 'agree' | 'disagree'): Promise<BetParticipationEntity> {
    const collection = await this.collection();
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { type } },
      { returnDocument: 'after' },
    );
    if (!result) throw new Error('Participação não encontrada para atualizar');
    return this.map(result);
  }
}
