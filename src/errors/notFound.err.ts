import { AppError } from './base.error';

export class NotFoundError extends AppError {
  constructor() {
    super('Not found', 404);
  }
}
