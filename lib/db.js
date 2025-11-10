import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Database will not connect in dev mode.')
}

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'skill_mittra',
    }).then(m => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
