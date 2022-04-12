import { IUser } from '@src/database/models';
import { Request } from 'express';

export interface PaginationParams {
  limit: number;
  page: number;
  totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

export interface DetailResponse<T> {
  data: Partial<T> | null;
}

export interface IRequest extends Request {
  context?: Partial<IUser>;
}

export interface ProcessEnv {
  [key: string]: string | undefined;
}

export interface GeneralObject {
  [key: string]: any;
}
