import { TDataItem } from "@/common/interfaces";

export * from "./loading.slice";
export * from "./account.slice";
export * from "./program.slice";
export * from "./tool.slice";

export const mapDic = <TItem extends TDataItem>(
  dic: Record<string, TItem>,
  ids: string[]
) => ids.map((id) => dic[id]);
