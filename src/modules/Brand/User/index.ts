import { ServiceContainer } from 'base/container.base';
import express, { Application } from 'express';
import { UserController } from './user.controller';

const USER_URL = '/';

export const UserRoute = express.Router({ mergeParams: true });
export function init(server: Application, container: ServiceContainer) {
  const controller = new UserController(container.user);

  UserRoute.get('/', controller.getUserList.bind(controller));
  UserRoute.get('/:id', controller.getUser.bind(controller));

  server.use(USER_URL, UserRoute);
}
