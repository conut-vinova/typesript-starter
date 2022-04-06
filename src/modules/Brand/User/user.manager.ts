import { GeneralObject, ListResponse } from 'base';
import { IUser } from 'database/models';
import { UserRepository } from './user.repo';

export class UserManager {
  private readonly repoUser: UserRepository;
  constructor(repoUser: UserRepository) {
    this.repoUser = repoUser;
  }

  public async getUserList(query: GeneralObject): Promise<ListResponse<IUser>> {
    try {
      const userList = await this.repoUser.getUserList(query);
      return userList;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getUser(id: string, filter: GeneralObject): Promise<any> {
    try {
      return await this.repoUser.getUser(id, filter);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
