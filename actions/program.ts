import { TProgram, TResponse, TResponsePagination } from "@/common/interfaces";
import { TActionCallback } from ".";
import { getLoadingStates, getProgramStates } from "@/stores";
import { Http } from "@/common/http";

export const getPrograms = async ({
  onSuccess,
  onError,
}: TActionCallback<string[]> = {}) => {
  try {
    getLoadingStates.set("listPrograms", true);
    const res = await Http.get<TResponsePagination<TProgram>>("/programs");
    if (!res.isSuccess) {
      console.error("Error when trying to get programs:", res.error);
      throw new Error(res.message);
    }
    getProgramStates.setMultiPrograms(res.data.items);
    await onSuccess?.(res.data.items.map((item) => item.id));
    return res.data;
  } catch (error: any) {
    console.log(error);
    await onError?.(error.message);
  } finally {
    getLoadingStates.set("listPrograms", false);
  }
};
export const getProgram = async (
  id: string,
  { onSuccess, onError }: TActionCallback<TProgram> = {}
) => {
  try {
    getLoadingStates.set("loadProgram", true);
    const res = await Http.get<TResponse<TProgram>>(`/programs/${id}`);
    if (!res.isSuccess) {
      console.error("Error when trying to get program:", res.error);
      throw new Error(res.message);
    }
    getProgramStates.setProgram(res.data);
    await onSuccess?.(res.data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    await onError?.(error.message);
  } finally {
    getLoadingStates.set("loadProgram", false);
  }
};
