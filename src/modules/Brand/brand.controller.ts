import { IRequest, successHandler } from '@src/base';
import { NextFunction, Response } from 'express';
import { BrandManager } from './brand.manager';
import { serializeGetAllBrand } from './brand.serializer';

export class BrandController {
  private manager: BrandManager;

  constructor(manager: BrandManager) {
    this.manager = manager;
  }

  public async getBrandList(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { data, pagination } = await this.manager.getBrandList(req.query);
      return successHandler(res, data.map(serializeGetAllBrand), 200, pagination);
    } catch (error) {
      return next(error);
    }
  }

  public async getBrand(req: IRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { data } = await this.manager.getBrand(id, req.query);
      return successHandler(res, data, 200);
    } catch (error) {
      return next(error);
    }
  }
}
