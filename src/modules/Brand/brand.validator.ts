import * as Joi from 'joi';

export const getAllBrand: Joi.SchemaMap = {
  page: Joi.string().email().trim().optional(),
  perPage: Joi.string().trim().optional(),
  chainId: Joi.string().optional(),
  brandId: Joi.string().optional(),
  sortBy: Joi.string().optional(),
  sortDirection: Joi.string().optional(),
  keyword: Joi.string().optional(),
};
