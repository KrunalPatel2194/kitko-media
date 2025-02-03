// src/middleware/rateLimiter.middleware.ts
import rateLimit from 'express-rate-limit';
import { ApiError } from '../utils/ApiError';

export const createRateLimiter = (options: {
  windowMs?: number;
  max?: number;
  endpoint?: string;
}) => {
  return rateLimit({
    windowMs: options.windowMs || 15 * 60 * 1000, // Default: 15 minutes
    max: options.max || 100,
    message: {
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: `Too many requests for ${options.endpoint || 'this endpoint'}. Please try again later.`
      }
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Specific limiters for different endpoints
export const apiLimiters = {
  general: createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,  
    endpoint: 'API'
  }),
  
  aiGeneration: createRateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    endpoint: 'AI generation'
  }),
  
  marketData: createRateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 50,
    endpoint: 'market data'
  })
};