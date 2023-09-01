export * from "./app";
export * from "./auth";

export type TActionCallback<T> = {
  onSuccess?: (data: T) => Promise<void> | void;
  onError?: (message: string) => Promise<void> | void;
};
