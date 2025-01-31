export class ApiError extends Error {
    public statusCode: number;
    public errorCode: string;
    public details?: Record<string, unknown>;
  
    constructor(
      message: string,
      statusCode: number,
      errorCode: string,
      details?: Record<string, unknown>
    ) {
      super(message);
      this.name = 'ApiError';
      this.statusCode = statusCode;
      this.errorCode = errorCode; // ✅ Fix: Consistent naming
      this.details = details;
    }
  }
  