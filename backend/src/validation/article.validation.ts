// src/validation/article.validation.ts
import { body } from 'express-validator';
import { validate } from '../middleware/validation.middleware';

const marketDataValidation = [
  body('marketData.price').optional().isNumeric(),
  body('marketData.marketCap').optional().isNumeric(),
  body('marketData.change24h').optional().isNumeric()
];

export const createArticleValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot be more than 200 characters'),
  body('titleFr').optional().trim()
    .isLength({ max: 200 }).withMessage('French title cannot be more than 200 characters'),
  body('content').notEmpty().withMessage('Content is required'),
  body('contentFr').optional(),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('publishDate').isISO8601().withMessage('Valid publishDate is required'),
  body('category').isIn(['mining', 'crypto']).withMessage('Category must be mining or crypto'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  body('tags').optional().isArray(),
  body('tags.*').optional().isString(),
  body('relatedCompanies').optional().isArray(),
  body('relatedCompanies.*').optional().isString(),
  ...marketDataValidation
];

export const updateArticleValidation = [
  body('title').optional().trim()
    .isLength({ max: 200 }).withMessage('Title cannot be more than 200 characters'),
  body('titleFr').optional().trim()
    .isLength({ max: 200 }).withMessage('French title cannot be more than 200 characters'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('contentFr').optional(),
  body('author').optional().trim().notEmpty().withMessage('Author cannot be empty'),
  body('publishDate').optional().isISO8601().withMessage('Invalid publishDate format'),
  body('category').optional().isIn(['mining', 'crypto']).withMessage('Invalid category'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
  body('tags').optional().isArray(),
  body('tags.*').optional().isString(),
  body('relatedCompanies').optional().isArray(),
  body('relatedCompanies.*').optional().isString(),
  ...marketDataValidation
];

export const generateArticleValidation = [
  body('pressRelease').notEmpty().withMessage('Press release content is required'),
  body('language').optional().isIn(['en', 'fr']).withMessage('Invalid language')
];