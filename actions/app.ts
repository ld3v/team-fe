import { useAccountState, useLoadingState, useToolsState } from "@/stores";
import { Http } from "../common/http";
import { TActionCallback } from ".";
import { TAccount } from "@/common/interfaces";

export const getAppStatus = async ({
  onSuccess,
  onError,
}: TActionCallback<any> = {}) => {
  try {
    const res = await Http.get<{ user?: TAccount; internalApps?: string[] }>(
      "/status"
    );
    if (res.user) {
      useAccountState.getState().setAccount(res.user, true);
    }
    if (res.internalApps) {
      useToolsState.getState().setOptions(res.internalApps);
    }
    await onSuccess?.({ user: res.user });
  } catch (error: any) {
    console.error("Error when fetch app status:", error);
    await onError?.(error);
  } finally {
    useLoadingState.getState().set("appStatus", false);
  }
};
