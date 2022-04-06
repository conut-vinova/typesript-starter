import { NextFunction, Response } from 'express';
import { AppError } from 'utils';
import { IRequest, PaginationParams } from './constant.base';

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err: any, req: IRequest, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProd = (err: any, req: IRequest, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      title: 'Something went wrong!',
      msg: err.message,
    });
  }
  return res.status(err.statusCode).json({
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

export const globalErrorHandler = (
  err: AppError,
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

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

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
