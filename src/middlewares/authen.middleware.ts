import { IRequest } from 'base';
import { User } from 'database/models';
import { CustomError } from 'errors/base.error';
import { NextFunction, Response } from 'express';
import { STATUS_CODE } from 'utils/constants';
import { verifyToken } from 'utils/functions';

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
