import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { TAccount, TAppIntegrated, TProgram } from "@/common/interfaces";
import { arrToMap } from "@/common/utils";
import { getAccountStates } from ".";

export type TToolStates = {
  selected?: string;
  ids: string[];
  dic: Record<
    string,
    Omit<TAppIntegrated, "createdBy"> & { createdBy: string }
  >;
  options: string[];
};
export type TToolActions = {
  setTool: (tool: TAppIntegrated, isSelected?: boolean) => void;
  setMultiTools: (tools: TAppIntegrated[]) => void;
  reset: () => void;
  setOptions: (options: string[]) => void;
  removeTool: (id: string) => void;
};

const initialStates: TToolStates = {
  selected: undefined,
  ids: [],
  dic: {},
  options: [],
};

const toolSlice: StateCreator<TToolActions & TToolStates> = (setter) => {
  const set = (cb: (base: TToolStates) => void) => setter(produce(cb));
  return {
    ...initialStates,
    setTool: ({ createdBy, ...data }, isSelected) => {
      set((s) => {
        s.dic[data.id] = { ...data, createdBy: createdBy.id };
        if (isSelected) {
          s.selected = data.id;
        }
      });
      getAccountStates.setAccount(createdBy);
    },
    setMultiTools: (tools) => {
      try {
        let newAccountDic: Record<string, TAccount> = {};
        set((s) => {
          const dataIds: string[] = [];
          tools.forEach(({ createdBy, ...data }) => {
            s.dic[data.id] = { ...data, createdBy: createdBy.id };
            dataIds.push(data.id);
            newAccountDic[createdBy.id] = createdBy;
          });
          s.ids = [...dataIds];
        });
        getAccountStates.setMultiAccountsByDic(newAccountDic);
      } catch (err) {
        console.error("Error when set multi tools:", err);
      }
    },
    removeTool: (idRemove) => {
      set((s) => {
        s.ids = s.ids.filter((id) => id !== idRemove);
        delete s.dic[idRemove];
      });
    },
    reset: () => {
      setter(initialStates);
    },
    setOptions: (options) => {
      set((s) => {
        s.options = options;
      });
    },
  };
};

export const useToolsState = create<TToolActions & TToolStates>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...toolSlice(...a),
        }),
        {
          name: "tool-store",
          skipHydration: true,
        }
      )
    )
  )
);

export const getToolStates = useToolsState.getState();
export const toolStates = {
  byIds: (
    ids: TToolStates["ids"],
    dic: TToolStates["dic"]
  ): TAppIntegrated[] => {
    console.log(ids);
    const { dic: accDic } = getAccountStates;

    return ids.map((id) => {
      const accId = dic[id].createdBy;

      return {
        ...dic[id],
        createdBy: accDic[accId],
      };
    });
  },
};
