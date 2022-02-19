import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const clearCollections = async () => {
  for (const collection in mongoose.connection.collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
  console.log('remove');
};
export const mongooseConnect = async () => {
  await mongoose.connect(process.env.DATABASE_TEST);
  await clearCollections();
};

export const startDB = async () => {
  await MongoMemoryServer.create({
    instance: {
      port: 27018 // by default choose any free port
    }
  });
};

export const handleConnection = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongooseConnect();
  } else {
    await clearCollections();
  }
};
