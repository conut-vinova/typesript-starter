import { AppError } from './base.error';

export interface FieldError {
  message: string;
  type: string;
  path: string[];
}

export class FieldValidationError extends AppError {
  public fields: FieldError[];

  constructor(message: string, fields: FieldError[], error?: Error) {
    super(message, 400);
    this.fields = fields;
  }

  public toModel() {
    return {
      message: this.message,
      status: this.status,
      fields: this.fields,
      statusCode: this.statusCode,
    };
  }
}
