import { TProgram, TResponsePagination } from "@/common/interfaces";
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
    getLoadingStates.set("listPrograms", false);
    getProgramStates.setMultiPrograms(res.data.items);
    await onSuccess?.(res.data.items.map((item) => item.id));
    return res.data;
  } catch (error: any) {
    await onError?.(error.message);
  }
};
