import { TAccount, TResponse } from "@/common/interfaces";
import { Http } from "../common/http";
import { getAccountStates, getLoadingStates } from "@/stores";
import { TActionCallback } from ".";

export const login = async (
  payload: { username: string; password: string },
  { onSuccess, onError }: TActionCallback<TAccount> = {}
) => {
  try {
    getLoadingStates.set("login", true);
    const res = await Http.post<TResponse<TAccount>>("/auth/login", payload);
    if (!res.isSuccess) {
      console.error("Error when trying to login:", res.error);
      throw new Error(res.message);
    }
    getAccountStates.setAccount(res.data, true);
    getLoadingStates.set("login", false);
    await onSuccess?.(res.data);
    return res.data;
  } catch (error: any) {
    await onError?.(error.message);
  }
};

export const logout = async ({
  onError,
  onSuccess,
}: TActionCallback<boolean> = {}) => {
  try {
    const res = await Http.get<TResponse<boolean>>("/auth/logout");
    if (!res.isSuccess) {
      console.error("Error when trying to logout:", res.error);
      throw new Error(res.message);
    }
    getAccountStates.reset();
    await onSuccess?.(res.data);
    return res.data;
  } catch (error: any) {
    await onError?.(error.message);
  }
};

export const register = async (
  payload: { username: string; password: string; displayName: string },
  { onError, onSuccess }: TActionCallback<TAccount> = {}
) => {
  try {
    const res = await Http.post<TResponse<TAccount>>("/auth/register", payload);
    if (!res.isSuccess) {
      console.error("Error when trying to register:", res.error);
      throw new Error(res.message);
    }
    getAccountStates.setAccount(res.data, true);
    await onSuccess?.(res.data);
    return res.data;
  } catch (error: any) {
    await onError?.(error.message);
  }
};
