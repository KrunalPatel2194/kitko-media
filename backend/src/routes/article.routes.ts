// src/routes/article.routes.ts
import { Router } from 'express';
import { ArticleController } from '../controllers/article.controller';
import { createArticleValidation, updateArticleValidation } from '../validation/article.validation';
import { validate } from '../middleware/validation.middleware';

const router = Router();

router.post('/', validate(createArticleValidation), ArticleController.createArticle);
router.get('/', ArticleController.getArticles);
router.get('/:id', ArticleController.getArticleById);
router.put('/:id', validate(updateArticleValidation), ArticleController.updateArticle);
router.delete('/:id', ArticleController.deleteArticle);

export { router as articleRoutes };