export interface ApiResponse<T> {
    data: T;
    message?: string;
  }
  
  export interface ErrorResponse {
    error: {
      code: string;
      message: string;
      details?: Record<string, unknown>;
    };
  }