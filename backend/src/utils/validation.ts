// src/utils/validation.ts
import { Request } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from './ApiError';

export const validateRequest = (req: Request): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().reduce((acc, error) => {
      const field = error.type === 'field' ? error.path : error.type;
      if (!acc[field]) {
        acc[field] = [];
      }
      acc[field].push(error.msg);
      return acc;
    }, {} as Record<string, string[]>);

    throw new ApiError(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      { fields: formattedErrors }
    );
  }
};