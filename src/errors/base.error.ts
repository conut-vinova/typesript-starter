export class AppError extends Error {
  status: string;
  statusCode: number;
  isOperational: boolean;
  constructor(message?: string, statusCode?: number) {
    super(message);

    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    // Error.captureStackTrace(this, this.constructor);
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
