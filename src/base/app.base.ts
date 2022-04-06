import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

const VERSION_API = process.env.VERSION_API;
export class ApplicationHandler {
  public app: Application;
  constructor(middlewareList: Array<any>, routeList: Array<express.Router>) {
    //* Create a new express app
    this.app = express();
    this.app.use(`/api/${VERSION_API}`, limiter);
    this.app.use(`/api/${VERSION_API}`, routeList);
    // this.app.use(middlewareList);
    // this.app.routes(routeList);
  }
}
