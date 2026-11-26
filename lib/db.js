import "server-only";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "paingains";

// Reuse one client across hot reloads in dev and across requests in prod.
const globalForMongo = globalThis;

function getClientPromise() {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add your MongoDB Atlas connection string to .env.local (see .env.example)."
    );
  }
  if (!globalForMongo._pgMongoClientPromise) {
    const client = new MongoClient(uri, { maxPoolSize: 10 });
    globalForMongo._pgMongoClientPromise = client.connect();
  }
  return globalForMongo._pgMongoClientPromise;
}

async function ensureIndexes(db) {
  await Promise.all([
    db.collection("users").createIndex({ email: 1 }, { unique: true }),
    db.collection("workouts").createIndex({ userId: 1, finishedAt: -1 }),
    db.collection("bookings").createIndex({ userId: 1, classId: 1 }, { unique: true }),
    db.collection("bookings").createIndex({ classId: 1 }),
  ]);
}

export async function getDb() {
  const client = await getClientPromise();
  const db = client.db(dbName);
  if (!globalForMongo._pgIndexesPromise) {
    globalForMongo._pgIndexesPromise = ensureIndexes(db).catch((error) => {
      globalForMongo._pgIndexesPromise = undefined;
      throw error;
    });
  }
  await globalForMongo._pgIndexesPromise;
  return db;
}
