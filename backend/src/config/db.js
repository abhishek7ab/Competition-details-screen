const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && !mongoUri) {
    throw new Error('MONGODB_URI is required in production; refusing to start with temporary storage.');
  }

  try {
    if (mongoUri) {
      // Never log the connection string because it may contain credentials.
      console.log('[DB] Connecting to configured MongoDB...');
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
      console.log('[DB] Connected to MongoDB successfully.');
      return;
    }

    console.log('[DB] MONGODB_URI is not set. Starting temporary in-memory MongoDB for local development.');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    console.log('[DB] Connected to temporary in-memory MongoDB.');
  } catch (error) {
    if (isProduction) {
      throw new Error(`MongoDB connection failed in production: ${error.message}`);
    }

    console.warn(`[DB] Configured MongoDB connection failed: ${error.message}`);
    console.log('[DB] Falling back to temporary in-memory MongoDB for local development.');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      await mongoose.connect(mongod.getUri());
      console.log('[DB] Connected to in-memory MongoDB fallback.');
    } catch (fallbackErr) {
      console.error('[DB] Critical error starting in-memory database:', fallbackErr);
      throw fallbackErr;
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
};

module.exports = { connectDB, disconnectDB };
