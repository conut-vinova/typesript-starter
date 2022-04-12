import { GeneralObject, ListResponse } from '@src/base';
import { IUser } from '@src/database/models';
import { Authenticator } from '@src/services/authentication';
import { Hasher } from '@src/services/hasher';
import { UserRepository } from './user.repo';

export class UserManager {
  private readonly repoUser: UserRepository;
  private readonly hasher: Hasher;
  private readonly auth: Authenticator;
  constructor(repoUser: UserRepository, hasher: Hasher, auth: Authenticator) {
    this.repoUser = repoUser;
    this.hasher = hasher;
    this.auth = auth;
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
