import Joi from 'joi';

export const UserQuerySchema = Joi.object({
  brandId: Joi.string().optional(),
  chainId: Joi.string().optional(),
  page: Joi.string().optional(),
  perPage: Joi.string().optional(),
});
