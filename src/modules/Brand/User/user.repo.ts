import { DetailResponse, GeneralObject, ListResponse } from '@src/base';
import { IUser } from '@src/database/models';
import { STATUS_CODE } from '@src/utils/constants';
import * as mongoose from 'mongoose';

export class UserRepository {
  private readonly model: mongoose.Model<IUser>;
  constructor(model: mongoose.Model<IUser>) {
    this.model = model;
  }

  public async getUserList(query: GeneralObject): Promise<ListResponse<IUser>> {
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

  public async getUser(id: string, filter: GeneralObject): Promise<DetailResponse<IUser>> {
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
