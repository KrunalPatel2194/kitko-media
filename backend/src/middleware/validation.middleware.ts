// src/middleware/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

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

    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        fields: formattedErrors
      }
    });
  };
};