import { Article } from '../models/Article';
import { IArticle, PaginationParams, PaginatedResponse } from '../types/article.types';
import { ApiError } from '../utils/ApiError';

export class ArticleService {
  static async createArticle(articleData: IArticle): Promise<IArticle> {
    const article = new Article(articleData);
    await article.save();
    return article.toJSON();
  }

  // src/services/article.service.ts
static async getArticles({ page = 1, limit = 10, status, category, query }: GetArticlesParams): Promise<PaginatedResponse<IArticle>> {
    const searchQuery = {
      ...(status && { status }),
      ...(category && { category }),
      ...(query && query)
    };
  
    const [articles, total] = await Promise.all([
      Article.find(searchQuery)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Article.countDocuments(searchQuery)
    ]);
  
    return {
      data: articles.map(article => article.toJSON()),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit
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
