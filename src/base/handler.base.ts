import { CustomError } from '@src/errors/base.error';
import { NextFunction, Response } from 'express';
import { IRequest, PaginationParams } from './interface.base';

const sendErrorDev = (err: any, req: IRequest, res: Response) => {
  const newErr = err.toModel();
  if (req.originalUrl.startsWith('/api')) {
    return res.status(newErr.statusCode).json(newErr);
  }
  return res.status(newErr.statusCode).json(err.toDefaultError());
};

const sendErrorProd = (err: any, req: IRequest, res: Response) => {
  const newErr = err.toModel();
  if (req.originalUrl.startsWith('/api')) {
    return res.status(newErr.statusCode).json(newErr);
  }

  if (newErr.isOperational) {
    return res.status(newErr.statusCode).json(newErr);
  }
  return res.status(newErr.statusCode).json({
    status: 'error',
    message: 'Please try again later.',
  });
};

export const globalErrorHandler = (
  err: CustomError,
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'JsonWebTokenError') error = CustomError.InvalidToken();
    if (error.name === 'TokenExpiredError') error = CustomError.ExpiredToken();

    sendErrorProd(error, req, res);
  }
};

export const successHandler = (
  res: Response,
  data: any[],
  statusCode: number,
  pagination?: PaginationParams,
  message?: string
) => {
  res.status(statusCode || 200);
  res.json({
    data,
    pagination,
    message,
  });
};
