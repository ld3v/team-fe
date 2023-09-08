import { TAppIntegrated } from ".";

export type TResponse<T> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: Record<string, any>; message: string };

export type TResponsePagination<T> =
  | { isSuccess: true; data: { items: T[]; total: number } }
  | { isSuccess: false; error: Record<string, any>; message: string };

export interface IToolCreateReq {
  name: string;
  description?: string;
  app: string;
}
export interface IToolCreateResult extends TAppIntegrated {
  APIKey: string;
}
