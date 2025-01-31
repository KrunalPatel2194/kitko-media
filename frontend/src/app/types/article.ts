// src/types/article.types.ts
export interface Article {
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
  
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  }
  
  export interface ArticleFilters {
    page?: number;
    limit?: number;
    status?: 'draft' | 'published';
    category?: 'mining' | 'crypto';
  }