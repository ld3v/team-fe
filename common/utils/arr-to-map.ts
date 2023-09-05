export const arrToMap = <T extends { id: string; [key: string]: any }>(
  arr: T[]
): { ids: string[]; dic: Record<string, T> } => {
  const ids: string[] = [];
  const dic: Record<string, T> = {};
  if (!arr) return { ids, dic };
  arr.forEach((arrItem) => {
    dic[arrItem.id as string] = arrItem;
    ids.push(arrItem.id);
  });
  return { ids, dic };
};
