import { IModelBase } from '@src/base';
import { STATUS_CODE } from '@src/utils/constants';
import * as mongoose from 'mongoose';
import { SchemaTypes } from 'mongoose';

const BrandSchemaName = 'brands';
const UserSchemaName = 'users';
const CompanySchemaName = 'companies';

export interface IBrand extends IModelBase {
  name: string;
  address: object;
  image: string;
  phoneNumber: string;
  openAt: Date;
  closeAt: Date;
  owner: string;
  company: string;
  macAddress: string;
  checkInTime: Date;
  maxCheckInTime: Date;
  minCheckInTime: Date;
  checkOutTime: Date;
  mincheckOutTime: Date;
  maxCheckOutTime: Date;
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

const test = schemaBase({
  name: {
    type: String,
    required: true,
  },
  address: {
    name: String,
    lng: mongoose.Schema.Types.Decimal128,
    lat: mongoose.Schema.Types.Decimal128,
  },
  image: String,
  phoneNumber: {
    type: String,
    required: true,
  },
  openAt: Date,
  closeAt: Date,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchemaName,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CompanySchemaName,
  },
  macAddress: String,
  checkInTime: Date,
  maxCheckInTime: Date,
  minCheckInTime: Date,
  checkOutTime: Date,
  mincheckOutTime: Date,
  maxCheckOutTime: Date,
});

const BrandSchema = new mongoose.Schema(test, {
  timestamps: true,
});

export const Brand = mongoose.model<IBrand>(BrandSchemaName, BrandSchema);
