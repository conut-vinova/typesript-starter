import { AppError } from './base.error';

export class UnauthorizedError extends AppError {
  constructor() {
    super('Unauthorized user', 401);
  }
}

export class PermissionError extends AppError {
  constructor() {
    super('Permission denied', 403);
  }
}
