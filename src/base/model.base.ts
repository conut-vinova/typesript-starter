import { Document, SchemaDefinition, SchemaTypes } from 'mongoose';
import { STATUS_CODE } from 'utils/constants';

const UserSchemaName = 'users';

export interface IModelBase extends Document {
  _id: string;
  status: StatusCode;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export function SchemaBase(schema: SchemaDefinition) {
  const defaultSchema: SchemaDefinition = {
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

  return {
    ...schema,
    ...defaultSchema,
  };
}
