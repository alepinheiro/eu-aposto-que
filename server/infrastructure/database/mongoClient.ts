import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDb(): Promise<Db> {
  if (db) return db;
  if (!client) {
    const config = useRuntimeConfig();
    const uri = config.mongodbUri || 'mongodb://localhost:27017/eu-aposto-que';
    client = new MongoClient(uri);
    await client.connect();
  }
  db = client.db();
  return db;
}
