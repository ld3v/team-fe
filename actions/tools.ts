import {
  IToolCreateReq,
  IToolCreateResult,
  TAppIntegrated,
  TResponse,
} from "@/common/interfaces";
import { TActionCallback } from ".";
import { getLoadingStates, getToolStates } from "@/stores";
import { Http } from "@/common/http";

export const getTools = async ({
  onSuccess,
  onError,
}: TActionCallback<string[]> = {}) => {
  try {
    getLoadingStates.set("listTools", true);
    const res = await Http.get<TResponse<TAppIntegrated[]>>("/integrate/apps");
    if (!res.isSuccess) {
      console.error("Error when trying to get apps:", res.error);
      throw new Error(res.message);
    }
    getToolStates.setMultiTools(res.data);
    await onSuccess?.(res.data.map((item) => item.id));
  } catch (error: any) {
    console.log(error);
    await onError?.(error.message);
  } finally {
    getLoadingStates.set("listTools", false);
  }
};

export const createTool = async (
  data: IToolCreateReq,
  { onSuccess, onError }: TActionCallback<IToolCreateResult> = {}
) => {
  try {
    getLoadingStates.set("createTool", true);
    const res = await Http.post<TResponse<IToolCreateResult>>(
      "/integrate/apps",
      data
    );
    if (!res.isSuccess) {
      console.error("Error when trying to create new app:", res.error);
      throw new Error(res.message);
    }
    getToolStates.setTool(res.data);
    await onSuccess?.(res.data);
  } catch (error: any) {
    console.log(error);
    await onError?.(error.message);
  } finally {
    getLoadingStates.set("createTool", false);
  }
};

export const deleteTool = async (
  id: string,
  { onSuccess, onError }: TActionCallback<boolean> = {}
) => {
  try {
    getLoadingStates.set("deleteTool", true);
    const res = await Http.delete<TResponse<boolean>>(`/integrate/apps/${id}`);
    if (!res.isSuccess) {
      console.error("Error when trying to delete app:", res.error);
      throw new Error(res.message);
    }
    getToolStates.removeTool(id);
    await onSuccess?.(res.data);
  } catch (error: any) {
    console.log(error);
    await onError?.(error.message);
  } finally {
    getLoadingStates.set("deleteTool", false);
  }
};
