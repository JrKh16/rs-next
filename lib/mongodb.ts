import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI ไม่ถูกตั้งค่าใน .env.local');
}

type MongooseCache = {
  conn: typeof import('mongoose') | null
}

declare global {
  var mongoose: MongooseCache
}

let cached: MongooseCache = global.mongoose || { conn: null }
global.mongoose = cached


export default async function connectDB() {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(MONGODB_URI);
  (global as any).mongoose = cached;
  return cached.conn;
}
