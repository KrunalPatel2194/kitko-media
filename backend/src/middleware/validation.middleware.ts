// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { ApiError } from '../utils/ApiError';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const formattedErrors = errors.array().reduce((acc, error) => {
      if ('path' in error) {
        const field = error.path;
        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(error.msg);
      }
      return acc;
    }, {} as Record<string, string[]>);

    // Throw ApiError with validation details
    throw new ApiError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      { fields: formattedErrors }
    );
  };
};