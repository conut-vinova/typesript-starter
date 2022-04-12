import { IUser } from '@src/database/models';
export interface IGetAllUserResponse {
  id: string;
  name: string;
}

export function serializeGetAllUser(model: IUser): IGetAllUserResponse {
  if (!model) {
  }
  return {
    id: model._id,
    name: model.name,
  };
}
