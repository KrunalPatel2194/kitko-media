import dotenv from 'dotenv';
dotenv.config();

export const environment = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseInt(process.env.PORT || '4000', 10),
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/news_management',
    API_PREFIX: '/api/v1',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000'
  };