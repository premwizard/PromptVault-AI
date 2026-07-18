import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';

// Standardized Error Response Format
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: any;
  requestId?: string;
}

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers['x-request-id'] as string;
  
  if (err instanceof ZodError) {
    logger.warn({ reqId: requestId, err }, 'Validation Error');
    const response: ApiErrorResponse = {
      success: false,
      message: 'Validation Error',
      errors: err.errors,
      requestId,
    };
    return res.status(400).json(response);
  }

  if (err instanceof AppError) {
    logger.warn({ reqId: requestId, err }, err.message);
    const response: ApiErrorResponse = {
      success: false,
      message: err.message,
      requestId,
    };
    return res.status(err.statusCode).json(response);
  }

  // Fallback for unhandled errors
  logger.error({ reqId: requestId, err }, 'Unhandled Internal Error');
  const response: ApiErrorResponse = {
    success: false,
    message: 'Internal Server Error',
    requestId,
  };

  // Do not leak stack traces in production
  if (process.env.NODE_ENV !== 'production') {
    response.errors = err.stack;
  }

  return res.status(500).json(response);
};
