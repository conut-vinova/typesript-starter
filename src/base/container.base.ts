import { Brand, User } from 'database/models';
import { BrandManager } from 'modules/Brand/brand.manager';
import { BrandRepository } from 'modules/Brand/brand.repo';
import { UserManager } from 'modules/Brand/User/user.manager';
import { UserRepository } from 'modules/Brand/User/user.repo';

export interface ServiceContainer {
  brand: BrandManager;
  user: UserManager;
}

export function createContainer(): ServiceContainer {
  const brandRepo = new BrandRepository(Brand);
  const userRepo = new UserRepository(User);
  return {
    brand: new BrandManager(brandRepo, userRepo),
    user: new UserManager(userRepo),
  };
}
