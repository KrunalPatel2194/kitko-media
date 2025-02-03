// src/controllers/article.controller.ts
import { Request, Response } from 'express';
import { ArticleService } from '../services/article.service';
import { AIService } from '../services/ai.service';
import { MarketService } from '../services/market.service';
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
    const { page, limit, status, category, search, language = 'en' } = req.query;
    const query: any = {};
   
    if (search) {
      const searchFields = language === 'fr' 
        ? ['titleFr', 'contentFr'] 
        : ['title', 'content'];
      
      query.$or = searchFields.map(field => ({
        [field]: { $regex: search, $options: 'i' }
      }));
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
    const { language = 'en' } = req.query;
    const article = await ArticleService.getArticleById(req.params.id);
    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }
    
    // If French content is requested but not available, generate it
    if (language === 'fr' && !article.contentFr) {
      article.contentFr = await AIService.translateToFrench(article.content);
      article.titleFr = await AIService.translateToFrench(article.title);
      await ArticleService.updateArticle(article.id!, {
        contentFr: article.contentFr,
        titleFr: article.titleFr
      });
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

  static generateFromPress = catchAsync(async (req: Request, res: Response) => {
    const { pressRelease } = req.body;
    if (!pressRelease) {
      throw new ApiError('Press release content is required', 400, 'VALIDATION_ERROR');
    }

    // Generate content sequentially to avoid API rate limits
    const content = await AIService.generateArticle(pressRelease);
    const metadata = await AIService.extractMetadata(content);
    const contentFr = await AIService.translateToFrench(content);
    const titleEn = await AIService.generateSEOTitle(content, 'en');
    const titleFr = await AIService.generateSEOTitle(contentFr, 'fr');

    const article = await ArticleService.createArticle({
      title: titleEn,
      titleFr: titleFr,
      content,
      contentFr,
      author: "AI Generator",
      publishDate: new Date(),
      status: 'draft',
      category: 'mining',
      tags: metadata.tags,
      relatedCompanies: metadata.relatedCompanies
    });

    // Update market data asynchronously
    if (metadata.relatedCompanies.length > 0) {
      MarketService.updateArticleMarketData(article.id!).catch(console.error);
    }

    res.status(201).json({ data: article });
  });

  static searchArticles = catchAsync(async (req: Request, res: Response) => {
    const { tags, companies, startDate, endDate, language = 'en' } = req.query;
    const query: any = {};

    if (tags) {
      query.tags = { $in: (tags as string).split(',') };
    }

    if (companies) {
      query.relatedCompanies = { $in: (companies as string).split(',') };
    }

    if (startDate || endDate) {
      query.publishDate = {};
      if (startDate) query.publishDate.$gte = new Date(startDate as string);
      if (endDate) query.publishDate.$lte = new Date(endDate as string);
    }

    const result = await ArticleService.getArticles({ query });
    res.json(result);
  });
}