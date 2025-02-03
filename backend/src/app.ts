// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { environment } from './config/environment';
import { connectDatabase } from './config/database';
import { apiRoutes } from './routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/Logger.middleware';
import { logger } from './config/Logger';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';


const app = express();
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
}));

// Sanitization
app.use(mongoSanitize());
// Enhanced helmet config
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      scriptSrc: ["'self'"]
    }
  }
}));

// CORS setup
app.use(cors({
  origin: environment.CORS_ORIGIN,
  credentials: true
}));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Logging
app.use(requestLogger);

// API routes
app.use(environment.API_PREFIX, apiRoutes);

// Error handling
app.use(errorHandler);

// Database connection and server start
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(environment.PORT, () => {
      logger.info(`Server is running on port ${environment.PORT} in ${environment.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  process.exit(1);
});

startServer();

export default app;