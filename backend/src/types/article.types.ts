// src/types/article.types.ts
export interface MarketData {
  price?: number;
  marketCap?: number;
  change24h?: number;
}

export interface Article {
  id: string;
  title: string;
  titleFr?: string;
  content: string;
  contentFr?: string;
  status: 'published' | 'draft';
  category: 'mining' | 'crypto';
  author: string;
  publishDate: string;
  tags?: string[];
  relatedCompanies?: string[];
  marketData?: MarketData;
  createdAt: string;
  updatedAt?: string;
}

export interface ArticleFilters {
  search?: string;
  tags?: string[];
  companies?: string[];
  startDate?: string;
  endDate?: string;
  language?: 'en' | 'fr';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}