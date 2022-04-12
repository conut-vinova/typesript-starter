import { GeneralObject } from '@src/base';
import { BrandRepository } from './brand.repo';
import { UserRepository } from './User/user.repo';

export class BrandManager {
  private readonly repoBrand: BrandRepository;
  private readonly repoUser: UserRepository;
  // 3rd -> using others service -> interface or class, not inject others repo
  //   private hasher: Hasher;
  //   private auth: Authenticator;

  constructor(repoBrand: BrandRepository, repoUser: UserRepository) {
    this.repoBrand = repoBrand;
    this.repoUser = repoUser;
  }

  public async getBrandList(query: GeneralObject): Promise<any> {
    try {
      const brandList = await this.repoBrand.getBrandList(query);
      const userList = await this.repoUser.getUserList(query);
      return {
        data: {
          brandList,
          userList,
        },
        pagination: brandList.pagination,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getBrand(id: string, filter: GeneralObject): Promise<any> {
    try {
      return await this.repoBrand.getBrand(id, filter);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
