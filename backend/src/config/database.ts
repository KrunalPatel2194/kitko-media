// src/config/database.ts
import mongoose from 'mongoose';
import { environment } from './environment';
import { logger } from './Logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    await mongoose.connect(environment.MONGODB_URI, options);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
};