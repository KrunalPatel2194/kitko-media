// src/utils/ApiError.ts
export class ApiError extends Error {
  status: number;
  code: string;
  details?: {
    fields?: Record<string, string | string[]>;
    [key: string]: unknown;
  };

  constructor(
    message: string, 
    status: number, 
    code: string, 
    details?: {
      fields?: Record<string, string | string[]>;
      [key: string]: unknown;
    }
  ) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;

    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }

  static notFound(message: string = 'Resource not found', code: string = 'NOT_FOUND'): ApiError {
    return new ApiError(message, 404, code);
  }

  static badRequest(message: string, code: string = 'BAD_REQUEST', details?: { fields?: Record<string, string | string[]> }): ApiError {
    return new ApiError(message, 400, code, details);
  }

  static validation(fields: Record<string, string[]>): ApiError {
    return new ApiError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      { fields }
    );
  }
}