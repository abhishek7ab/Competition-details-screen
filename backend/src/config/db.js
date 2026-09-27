const mongoose = require('mongoose');

let mongod = null;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
      console.log(`[DB] Connecting to provided MongoDB URI: ${mongoUri}`);
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log('[DB] Connected to External MongoDB successfully!');
    } else {
      console.log('[DB] No MONGODB_URI found. Initializing MongoMemoryServer for standalone zero-config execution...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      console.log(`[DB] In-Memory MongoDB running at: ${inMemoryUri}`);
      await mongoose.connect(inMemoryUri);
      console.log('[DB] Connected to In-Memory MongoDB successfully!');
    }
  } catch (error) {
    console.warn(`[DB] Connection to MongoDB URI failed: ${error.message}`);
    console.log('[DB] Falling back to In-Memory MongoDB Server so the app runs without external setup...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      await mongoose.connect(inMemoryUri);
      console.log('[DB] Connected to In-Memory MongoDB fallback successfully!');
    } catch (fallbackErr) {
      console.error('[DB] Critical error starting in-memory database:', fallbackErr);
      process.exit(1);
    }
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
};

module.exports = { connectDB, disconnectDB };
