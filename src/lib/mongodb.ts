import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

// Global is used here to preserve the value across module reloads in development
// and serverless function re-invocations.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongoose: any;
}

if (!global._mongoose) global._mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (global._mongoose.conn) {
    return global._mongoose.conn;
  }

  if (!global._mongoose.promise) {
    const opts = {
      // Recommended options
      bufferCommands: false,
      // useNewUrlParser and useUnifiedTopology are defaults in Mongoose 7
    } as const;

    // MONGODB_URI is validated above; assert as string for TypeScript.
    global._mongoose.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  global._mongoose.conn = await global._mongoose.promise;
  return global._mongoose.conn;
}

export default connectToDatabase;
