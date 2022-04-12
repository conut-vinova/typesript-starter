// import { IUser } from 'database/models';
// import { CustomError } from 'errors/base.error';
import { IUser } from '@src/database/models';
import { CustomError } from '@src/errors/base.error';
import { UserRepository } from '@src/modules/Brand/User/user.repo';
import * as jwt from 'jsonwebtoken';
// import { UserRepository } from 'modules/Brand/User/user.repo';

export interface AuthUser {
  id: number;
  email: string;
  role: Role;
}

export enum Role {
  user = 'user',
  admin = 'admin',
}

export interface Authenticator {
  validate(token: string): Promise<AuthUser>;
  authenticate(user: IUser): string;
}

export class JWTAuthenticator implements Authenticator {
  private userRepo: UserRepository;
  private secret: string;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
    this.secret = process.env.SECRET_KEY || 'secret';
  }

  public async validate(token: string): Promise<AuthUser> {
    try {
      const decode: any = jwt.verify(token, this.secret);
      // const user = await this.userRepo.findByEmail(decode.email);
      return {
        id: 123,
        email: 'test@gmail.com',
        role: Role.admin,
      };
    } catch (err) {
      throw CustomError.Unauthorized();
    }
  }

  public authenticate(user: IUser): string {
    return jwt.sign({ id: user.id, email: user.email }, this.secret, {
      expiresIn: 60 * 60,
    });
  }
}
