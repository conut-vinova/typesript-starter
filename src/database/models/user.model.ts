import { IModelBase } from '@src/base';
import { STATUS_CODE } from '@src/utils/constants';
// import { IModelBase } from 'base/model.base';
import * as mongoose from 'mongoose';
import { SchemaTypes } from 'mongoose';

const UserSchemaName = 'users';
const CompanySchemaName = 'companies';
const BrandSchemaName = 'brands';
const RecipeSchemaName = 'recipes';
const GroupSchemaName = 'groups';
const PositionSchemaName = 'positions';

export interface IUser extends IModelBase {
  email: string;
  image: string;
  password: string;
  name: string;
  phoneNumber: string;
  company: string;
  brand: string;
  facebook: string;
  google: string;
  facebookToken: string;
  googleToken: string;
  address: object;
  position: string;
  group: string;
  recipe: string;
  firebaseToken: string;
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

export function SchemaBase(schema: any) {
  return {
    ...schema,
    ...defaultSchema,
  };
}

const UserSchema = new mongoose.Schema(
  SchemaBase({
    email: {
      type: String,
      required: true,
    },
    image: String,
    password: String,
    name: String,
    phoneNumber: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CompanySchemaName,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: BrandSchemaName,
    },
    facebook: String,
    google: String,
    facebookToken: String,
    googleToken: String,
    address: {
      name: String,
      lng: mongoose.Schema.Types.Decimal128,
      lat: mongoose.Schema.Types.Decimal128,
    },
    // role: String,
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: PositionSchemaName,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: GroupSchemaName,
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: RecipeSchemaName,
    },
    firebaseToken: String,
  }),
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>(UserSchemaName, UserSchema);
