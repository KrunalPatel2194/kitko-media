// src/controllers/article.controller.ts
import { Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import { catchAsync } from '../utils/catchAsync';
import { validateRequest } from '../utils/validation';
import { ApiError } from '../utils/ApiError';

export class ArticleController {
  static createArticle = catchAsync(async (req: Request, res: Response) => {
    validateRequest(req);
    const article = await ArticleService.createArticle(req.body);
    res.status(201).json({ data: article });
  });

  static getArticles = catchAsync(async (req: Request, res: Response) => {
    const { page, limit, status, category, search } = req.query;
    const query: any = {};
   
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
   
    if (status) query.status = status;
    if (category) query.category = category;
   
    const result = await ArticleService.getArticles({
      page: page ? parseInt(page as string) : undefined,
      limit: limit ? parseInt(limit as string) : undefined,
      status: status as 'draft' | 'published',
      category: category as 'mining' | 'crypto',
      query
    });
    res.json(result);
   });

  static getArticleById = catchAsync(async (req: Request, res: Response) => {
    const article = await ArticleService.getArticleById(req.params.id);
    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }
    res.json({ data: article });
  });

  static updateArticle = catchAsync(async (req: Request, res: Response) => {
    validateRequest(req);
    const article = await ArticleService.updateArticle(req.params.id, req.body);
    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }
    res.json({ data: article });
  });

  static deleteArticle = catchAsync(async (req: Request, res: Response) => {
    const article = await ArticleService.deleteArticle(req.params.id);
    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }
    res.status(204).send();
  });

  
}

