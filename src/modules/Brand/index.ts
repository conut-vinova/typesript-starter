import { ServiceContainer } from 'base/container.base';
import express, { Application } from 'express';
import { validate } from 'middlewares';
import { BrandController } from './brand.controller';
import * as validators from './brand.validator';
import { UserRoute } from './User';
const BRAND_URL = '/brand';
const USER_URL = '/brand/:brandId/users';

export function init(server: Application, container: ServiceContainer) {
  const BrandRoute = express.Router();
  const controller = new BrandController(container.managers.brand);

  BrandRoute.use(USER_URL, UserRoute);
  BrandRoute.get(
    '/',
    // middleware.authentication(container.lib.authenticator),
    // middleware.authorization([Role.user, Role.admin]),
    validate({ query: validators.getAllBrand }),
    controller.getBrandList.bind(controller)
  );
  BrandRoute.get(
    '/:id',
    // middleware.authentication(container.lib.authenticator),
    // middleware.authorization([Role.user, Role.admin]),
    controller.getBrand.bind(controller)
  );

  server.use(BRAND_URL, BrandRoute);
}

//Routes
