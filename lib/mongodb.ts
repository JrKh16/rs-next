import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

type MongooseCache = {
  conn: typeof mongoose | null
}

declare global {
  // 👇 declare global cache ตัวแปร mongoose
  var mongoose: MongooseCache | undefined
}

const globalMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache
}

const cached: MongooseCache = globalMongoose.mongoose || { conn: null }
globalMongoose.mongoose = cached

export default async function connectDB() {
  if (cached.conn) return cached.conn
  cached.conn = await mongoose.connect(MONGODB_URI)
  return cached.conn
}
