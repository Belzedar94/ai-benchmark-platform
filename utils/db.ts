import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Global variables for caching the connection
declare global {
  var mongoConnection: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
    mongoMemoryServer: MongoMemoryServer | null;
  };
}

// Initialize the global variable if it doesn't exist
if (!global.mongoConnection) {
  global.mongoConnection = {
    conn: null,
    promise: null,
    mongoMemoryServer: null
  };
}

/**
 * Connect to MongoDB database
 * Uses in-memory MongoDB server for development if no URI is provided
 */
async function connectToDatabase() {
  // If we already have a connection, return it
  if (global.mongoConnection.conn) {
    return global.mongoConnection.conn;
  }

  // If we're already connecting, wait for the promise to resolve
  if (global.mongoConnection.promise) {
    global.mongoConnection.conn = await global.mongoConnection.promise;
    return global.mongoConnection.conn;
  }

  // Create a new connection
  try {
    // Use MongoDB memory server for development
    let MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      console.log('No MongoDB URI provided, using in-memory MongoDB server');
      global.mongoConnection.mongoMemoryServer = await MongoMemoryServer.create();
      MONGODB_URI = global.mongoConnection.mongoMemoryServer.getUri();
      console.log(`MongoDB Memory Server URI: ${MONGODB_URI}`);
    }

    const options = {
      bufferCommands: false,
    };

    // Connect to MongoDB
    global.mongoConnection.promise = mongoose.connect(MONGODB_URI, options);
    global.mongoConnection.conn = await global.mongoConnection.promise;
    
    console.log('Connected to MongoDB');
    return global.mongoConnection.conn;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export default connectToDatabase;