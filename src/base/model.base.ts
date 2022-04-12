import { STATUS_CODE } from '@src/utils/constants';
import { Document, SchemaDefinition, SchemaTypes } from 'mongoose';

const UserSchemaName = 'users';

export interface IModelBase extends Document {
  _id: string;
  status: STATUS_CODE;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const defaultSchema = {
  status: {
    type: String,
    enum: STATUS_CODE,
    required: true,
    default: STATUS_CODE.ACTIVE,
  },
  createdBy: {
    type: SchemaTypes.ObjectId,
    ref: UserSchemaName,
  },
  updatedBy: {
    type: SchemaTypes.ObjectId,
    ref: UserSchemaName,
  },
};

export function schemaBase(schema: any) {
  return {
    ...schema,
    ...defaultSchema,
  };
}
