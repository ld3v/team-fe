export type TResponse<T> =
  | { isSuccess: true; data: T }
  | { isSuccess: false; error: Record<string, any>; message: string };

export type TResponsePagination<T> =
  | { isSuccess: true; data: { items: T[]; total: number } }
  | { isSuccess: false; error: Record<string, any>; message: string };
