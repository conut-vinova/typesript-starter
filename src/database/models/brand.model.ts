import { IModelBase, SchemaBase } from 'base';
import * as mongoose from 'mongoose';

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

const BrandSchema = new mongoose.Schema(
  SchemaBase({
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
  }),
  {
    timestamps: true,
  }
);

export const Brand = mongoose.model<IBrand>(BrandSchemaName, BrandSchema);
