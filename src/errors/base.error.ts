export class CustomError extends Error {
  status: string;
  statusCode: number;
  isOperational: boolean;
  constructor(message?: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static Forbidden() {
    return new this("You don't have permission to do this action.", 403);
  }
  static Unauthorized() {
    return new this('Unauthorized user', 401);
  }
  static ExpiredToken() {
    return new this('The provided token has expired.', 401);
  }
  static InvalidToken() {
    return new this('Invalid token. Please log in again!', 401);
  }
  static NotFound() {
    return new this('Not found', 404);
  }

  public toDefaultError() {
    return {
      status: 'error',
      message: this.message || 'Something went very wrong',
    };
  }

  public toModel() {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}
