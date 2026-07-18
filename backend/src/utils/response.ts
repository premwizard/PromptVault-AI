import { Response } from 'express';

export interface ApiResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
}

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message?: string,
  meta?: ApiResponse<T>['meta']
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
    meta,
  };
  return res.status(statusCode).json(response);
};
