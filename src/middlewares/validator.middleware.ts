import { IRequest } from 'base';
import { NextFunction, Response } from 'express';
import { FieldValidationError } from 'interfaces/errors.interface';
import * as Joi from 'joi';

export interface SchemaMap {
  params?: { [key: string]: Joi.SchemaLike };
  query?: { [key: string]: Joi.SchemaLike };
  body?: { [key: string]: Joi.SchemaLike } | Joi.ArraySchema;
  headers?: { [key: string]: Joi.SchemaLike };
}

export function validate(schema: SchemaMap) {
  return async (req: IRequest, res: Response, next: NextFunction) => {
    // const value = req[]
    const valResult = Joi.validate(req, schema, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (valResult.error) {
      throw new FieldValidationError(
        valResult.error.message,
        valResult.error.details.map((f) => ({
          message: f.message,
          path: f.path,
          type: f.type,
        })),
        valResult.error
      );
    }

    await next();
  };
}
