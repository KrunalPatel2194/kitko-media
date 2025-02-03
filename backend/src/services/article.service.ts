import { Article } from '../models/Article';
import { IArticle, PaginationParams, PaginatedResponse, GetArticlesParams } from '../types/article.types';
import  { ApiError}  from '../utils/ApiError';

export class ArticleService {
  static async createArticle(articleData: IArticle): Promise<IArticle> {
    const article = new Article(articleData);
    await article.save();
    return article.toJSON();
  }

  // src/services/article.service.ts
  static async getArticles({
    page = 1,
    limit = 10,
    status,
    category,
    query = {}
  }: {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: 'mining' | 'crypto';
    query?: any;
  }) {
    // Ensure page and limit are valid numbers
    const validPage = Math.max(1, page);
    const validLimit = Math.max(1, Math.min(100, limit)); // Cap at 100 items per page
    const skip = (validPage - 1) * validLimit;

    // Build query
    const finalQuery = { ...query };
    if (status) finalQuery.status = status;
    if (category) finalQuery.category = category;

    // Execute queries in parallel
    const [data, totalItems] = await Promise.all([
      Article.find(finalQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(validLimit)
        .exec(),
      Article.countDocuments(finalQuery)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalItems / validLimit);
    const hasNextPage = validPage < totalPages;
    const hasPrevPage = validPage > 1;

    return {
      data,
      pagination: {
        currentPage: validPage,
        totalPages,
        totalItems,
        hasNextPage,
        hasPrevPage,
        limit: validLimit
      }
    };
  }

  static async getArticleById(id: string): Promise<IArticle> {
    const article = await Article.findById(id);
    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }
    return article.toJSON();
  }

  static async updateArticle(id: string, updateData: Partial<IArticle>): Promise<IArticle> {
    const article = await Article.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!article) {
      throw new ApiError('Article not found', 404, 'ARTICLE_NOT_FOUND');
    }

    return article.toJSON();
  }

  static async deleteArticle(id: string): Promise<boolean> {
    const result = await Article.findByIdAndDelete(id);
    return result !== null;
  }

  
}
