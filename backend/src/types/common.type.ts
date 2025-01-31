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
  
  export interface ApiError extends Error {
    statusCode: number;
    code: string;
    details?: Record<string, unknown>;
  }
  