import { DetailResponse, GeneralObject, ListResponse } from 'base';
import { IBrand } from 'database/models';
import * as mongoose from 'mongoose';
import { STATUS_CODE } from 'utils';

export class BrandRepository {
  private readonly model: mongoose.Model<IBrand>;
  constructor(model: mongoose.Model<IBrand>) {
    this.model = model;
  }

  public async getBrandList(query: GeneralObject): Promise<ListResponse<IBrand>> {
    try {
      const { page, perPage } = query;
      const data = await this.model.find({ status: STATUS_CODE.ACTIVE });
      return {
        data,
        pagination: {
          limit: 1,
          page: 2,
          totalRows: 20,
        },
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getBrand(id: string, filter: GeneralObject): Promise<DetailResponse<IBrand>> {
    try {
      const data = await this.model.findOne({
        status: STATUS_CODE.ACTIVE,
        _id: id,
        ...filter,
      });
      return {
        data,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
