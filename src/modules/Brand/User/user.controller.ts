import { IRequest, successHandler } from 'base';
import { NextFunction, Response } from 'express';
import { AppError } from 'utils';
import { UserManager } from './user.manager';
import { serializeGetAllUser } from './user.serializer';

export class UserController {
  private manager: UserManager;

  constructor(manager: UserManager) {
    this.manager = manager;
  }

  public async getUserList(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { data, pagination } = await this.manager.getUserList(req.query);
      return successHandler(res, data.map(serializeGetAllUser), 200, pagination);
    } catch (error) {
      return next(error);
    }
  }

  public async getUser(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { data } = await this.manager.getUser(id, req.query);
      return successHandler(res, data, 200);
    } catch (error) {
      return next(error);
    }
  }
}
