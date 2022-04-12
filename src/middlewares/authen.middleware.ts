import { IRequest } from '@src/base';
import { User } from '@src/database/models';
import { CustomError } from '@src/errors/base.error';
import { STATUS_CODE } from '@src/utils/constants';
import { verifyToken } from '@src/utils/functions';
import { NextFunction, Response } from 'express';

export const authen = async (req: IRequest, res: Response, next: NextFunction) => {
  const tokenFromClient = req.headers['authorization'];

  if (typeof tokenFromClient !== 'undefined') {
    try {
      const bearer = tokenFromClient.split(' ');
      if (!bearer[0] || bearer[0].toUpperCase() !== 'BEARER' || !bearer[1]) {
        return next(CustomError.Unauthorized());
      }
      const bearerToken = bearer[1];
      const decoded: any = await verifyToken(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      const { id } = decoded;
      const user = await User.findOne({ _id: id, status: STATUS_CODE.ACTIVE });
      if (!user) {
        return next(new CustomError('User not found', 400));
      }
      req.context = decoded;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next(CustomError.Unauthorized());
  }
};
