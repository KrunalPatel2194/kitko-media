// src/validation/article.validation.ts
import { validate } from '@/middleware/validation.middleware';
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
export const validateCreateArticle = validate([
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot be more than 200 characters'),
  
  body('content')
    .notEmpty()
    .withMessage('Content is required'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  
  body('publishDate')
    .notEmpty()
    .withMessage('Publish date is required')
    .isISO8601()
    .withMessage('Invalid publish date format'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['mining', 'crypto'])
    .withMessage('Invalid category'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Invalid status')
]);
export const updateArticleValidation = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('author').optional().notEmpty().withMessage('Author cannot be empty'),
  body('publishDate').optional().isISO8601().withMessage('Invalid publishDate format'),
  body('category').optional().isIn(['mining', 'crypto']).withMessage('Invalid category'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status')
];

export const articleValidation = validate([
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot be more than 200 characters'),
  
  body('content')
    .notEmpty()
    .withMessage('Content is required'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required'),
  
  body('publishDate')
    .notEmpty()
    .withMessage('Publish date is required')
    .isISO8601()
    .withMessage('Invalid publish date format'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['mining', 'crypto'])
    .withMessage('Invalid category'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Invalid status')
]);