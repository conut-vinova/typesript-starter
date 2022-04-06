import { globalErrorHandler } from 'base';
import { ServiceContainer } from 'base/container.base';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { AppError } from 'utils';
import * as brand from './modules/Brand';
import * as user from './modules/Brand/User';

export class AppSrv {
  private appSrv: Application;
  private container: ServiceContainer;
  constructor(appSrv: Application, container: ServiceContainer) {
    this.appSrv = appSrv;
    this.container = container;
    appSrv.use(helmet());
    appSrv.use(cors());
    appSrv.use(helmet());
    appSrv.use(compression());
    appSrv.use(express.json({ limit: '10kb' }));
    if (process.env.NODE_ENV === 'development') appSrv.use(morgan('dev'));

    // Register routes
    brand.init(appSrv, this.container);
    user.init(appSrv, this.container);

    appSrv.all('*', (req, res, next) => {
      next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    appSrv.use(globalErrorHandler);
  }

  public get() {
    return this.appSrv;
  }
}

// export function createApp(container: ServiceContainer): Application {
//   const appSrv = express();

//   // Register Middlewares
//   appSrv.use(helmet());
//   appSrv.use(cors());
//   appSrv.use(helmet());
//   appSrv.use(compression());
//   appSrv.use(express.json({ limit: '10kb' }));
//   if (process.env.NODE_ENV === 'development') appSrv.use(morgan('dev'));

//   // Register routes
//   brand.init(appSrv, container);

//   appSrv.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
//   });
//   appSrv.use(globalErrorHandler);

//   return appSrv;
// }
