import { IRequest } from 'base';
import { NextFunction, Response } from 'express';
import { AppError } from 'utils';

export const author = (...permittedRoles: string[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const role = req.context?.position;
    if (role && permittedRoles.includes(role)) {
      next();
    } else {
      return next(new AppError('Dont have permission to access this end point', 403));
    }
  };
};
