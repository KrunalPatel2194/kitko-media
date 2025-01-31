export interface Article {
    id: string;
    title: string;
    content: string;
    author: string;
    publishDate: string;
    status: 'draft' | 'published';
    category: 'mining' | 'crypto';
    createdAt: string;
    updatedAt: string;
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