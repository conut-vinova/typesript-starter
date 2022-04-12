import { IRequest } from '@src/base';
import { CustomError } from '@src/errors/base.error';
import { NextFunction, Response } from 'express';

export const author = (...permittedRoles: string[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const role = req.context?.position;
    if (role && permittedRoles.includes(role)) {
      next();
    } else {
      return next(CustomError.Forbidden());
    }
  };
};
