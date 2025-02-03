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
  
  export interface PaginationOptions {
    page?: number;
    limit?: number;
  }
  
  export interface PaginationResult<T> {
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