// src/routes/article.routes.ts
import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { createArticleValidation, updateArticleValidation, generateArticleValidation } from '../validation/article.validation';
import { validate } from '../middleware/validation.middleware';
import { apiLimiters } from '../middleware/ratelimiter.middleware';

const router = Router();

// Apply general rate limiter to all routes
router.use(apiLimiters.general);

// Base CRUD routes
router.post('/', validate(createArticleValidation), ArticleController.createArticle);
router.get('/', ArticleController.getArticles);
router.get('/:id', ArticleController.getArticleById);
router.put('/:id', validate(updateArticleValidation), ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

// AI generation with specific rate limit
router.post('/generate', 
  apiLimiters.aiGeneration,
  validate(generateArticleValidation), 
  ArticleController.generateFromPress
);

// Market data with specific rate limit
router.get('/search/advanced',
  apiLimiters.marketData,
  ArticleController.searchArticles
);

export { router as articleRoutes };