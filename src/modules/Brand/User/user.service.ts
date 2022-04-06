import { ListResponse } from 'base';
import { IUser, User } from 'database/models';
import { STATUS_CODE } from 'utils';

export class UserService {
  static getAllUser = async (query: any): Promise<ListResponse<IUser>> => {
    try {
      const { page, perPage, ...others } = query;
      const data = await User.find({ status: STATUS_CODE.ACTIVE });
      return {
        data,
        pagination: {
          limit: 1,
          page: 2,
          totalRows: 20,
        },
      };
    } catch (err) {
      throw err;
    }
  };

  static getUser = async (id: string): Promise<ListResponse<IUser>> => {
    try {
      const data = await User.find({ status: STATUS_CODE.ACTIVE });
      return {
        data,
        pagination: {
          limit: 1,
          page: 2,
          totalRows: 20,
        },
      };
    } catch (err) {
      throw err;
    }
  };
}
