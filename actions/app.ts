import { useAccountState, useLoadingState } from "@/stores";
import { Http } from "../common/http";
import { TActionCallback } from ".";

export const getAppStatus = async ({
  onSuccess,
  onError,
}: TActionCallback<any> = {}) => {
  try {
    const res = await Http.get<{ user: any }>("/status");
    if (res.user) {
      useAccountState.getState().setAccount(res.user, true);
    }
    await onSuccess?.({ user: res.user });
  } catch (error: any) {
    console.error("Error when fetch app status:", error);
    await onError?.(error);
  } finally {
    useLoadingState.getState().set("appStatus", false);
  }
};
