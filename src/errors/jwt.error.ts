import { AppError } from './base.error';

export class JWTError extends AppError {
  constructor() {
    super('Invalid token. Please log in again!', 401);
  }
}

export class JWTExpiredError extends AppError {
  constructor() {
    super('Your token has expired! Please log in again.', 401);
  }
}
