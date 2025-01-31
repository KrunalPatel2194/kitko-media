// src/validation/article.validation.ts
import { body, query, param } from 'express-validator';
// src/validation/article.validation.ts

export const createArticleValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishDate').isISO8601().withMessage('Valid publishDate is required'),
  body('category').isIn(['mining', 'crypto']).withMessage('Category must be mining or crypto'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status')
];

export const updateArticleValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author cannot be empty'),
  body('publishDate').optional().isISO8601().withMessage('Invalid publishDate format'),
  body('category').optional().isIn(['mining', 'crypto']).withMessage('Invalid category'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status')
];