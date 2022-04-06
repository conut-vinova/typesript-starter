import { IRequest } from 'base';
import { User } from 'database/models';
import { NextFunction, Response } from 'express';
import { AppError, STATUS_CODE, verifyToken } from 'utils';

export const authen = async (req: IRequest, res: Response, next: NextFunction) => {
  const tokenFromClient = req.headers['authorization'];

  if (typeof tokenFromClient !== 'undefined') {
    try {
      const bearer = tokenFromClient.split(' ');
      if (!bearer[0] || bearer[0].toUpperCase() !== 'BEARER' || !bearer[1]) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
      }
      const bearerToken = bearer[1];
      const decoded: any = await verifyToken(
        bearerToken,
        process.env.ACCESS_TOKEN_SECRET as string
      );
      const { id } = decoded;
      const user = await User.findOne({ _id: id, status: STATUS_CODE.ACTIVE });
      if (!user) {
        return next(new AppError('User not found', 401));
      }
      req.context = decoded;
      next();
    } catch (error) {
      return next(new AppError('Error', 400));
    }
  } else {
    return next(new AppError('No token provided', 401));
  }
};
