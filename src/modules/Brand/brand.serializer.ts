import { IBrand } from 'database/models';

export interface IGetALlBrandRespone {
  id: string;
  name: string;
  image: string;
  address: object;
}

export function serializeGetAllBrand(model: IBrand): IGetALlBrandRespone {
  if (!model) {
  }
  return {
    id: model._id,
    name: model.name,
    image: model.image,
    address: {
      name: (model.address as any).name,
      lng: (model.address as any).lng.toString(),
      lat: (model.address as any).lat.toString(),
    },
  };
}
