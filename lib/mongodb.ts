import mongoose, { Mongoose } from "mongoose";

/**
 * Ensure MongoDB URI exists
 */
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Type for cached mongoose connection
 */
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Global cache object
 * Prevents creating multiple connections during development
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
};

/**
 * Save cache to global object in development
 */
if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

/**
 * Connect to MongoDB using mongoose
 */
export async function connectToDatabase(): Promise<Mongoose> {
  // If connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection promise exists, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts);
  }

  try {
    // Await the connection promise
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise if connection fails
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}