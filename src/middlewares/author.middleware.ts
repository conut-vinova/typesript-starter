import { IRequest } from 'base';
import { PermissionError } from 'errors/auth.error';
import { NextFunction, Response } from 'express';

export const author = (...permittedRoles: string[]) => {
  return (req: IRequest, res: Response, next: NextFunction) => {
    const role = req.context?.position;
    if (role && permittedRoles.includes(role)) {
      next();
    } else {
      return next(new PermissionError());
    }
  };
};
