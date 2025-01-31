// src/types/article.types.ts
// src/types/article.types.ts
export interface IArticle {
  id?: string;
  title: string;
  titleFr?: string;
  content: string;
  contentFr?: string;
  author: string;
  publishDate: Date;
  status: 'draft' | 'published';
  category: 'mining' | 'crypto';
  tags?: string[];
  relatedCompanies?: string[];
  marketData?: {
    price?: number;
    marketCap?: number;
    change24h?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
  
  export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  }

export interface GetArticlesParams {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: 'mining' | 'crypto';
    query?: any;
  }