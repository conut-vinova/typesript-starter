import { Brand, User } from 'database/models';
import { BrandManager } from 'modules/Brand/brand.manager';
import { BrandRepository } from 'modules/Brand/brand.repo';
import { UserManager } from 'modules/Brand/User/user.manager';
import { UserRepository } from 'modules/Brand/User/user.repo';
import { Authenticator, JWTAuthenticator } from 'services/authentication';
import { BCryptHasher, Hasher } from 'services/hasher';

export interface ServiceContainer {
  services: {
    hasher: Hasher;
    authenticator: Authenticator;
  };
  repositories: {
    brand: BrandRepository;
    user: UserRepository;
  };
  managers: {
    brand: BrandManager;
    user: UserManager;
  };
}

export function createContainer(): ServiceContainer {
  const brandRepo = new BrandRepository(Brand);
  const userRepo = new UserRepository(User);
  const hasher = new BCryptHasher();
  const authenticator = new JWTAuthenticator(userRepo);
  return {
    services: {
      hasher,
      authenticator,
    },
    repositories: {
      brand: brandRepo,
      user: userRepo,
    },
    managers: {
      brand: new BrandManager(brandRepo, userRepo),
      user: new UserManager(userRepo, hasher, authenticator),
    },
  };
}
