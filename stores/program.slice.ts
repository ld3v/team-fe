import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { TAccount, TProgram } from "@/common/interfaces";
import { arrToMap } from "@/common/utils";
import { getAccountStates } from ".";

export type TProgramStates = {
  selected?: string;
  ids: string[];
  dic: Record<string, Omit<TProgram, "members"> & { members: string[] }>;
};
export type TProgramActions = {
  setProgram: (program: TProgram, isSelected?: boolean) => void;
  setMultiPrograms: (programs: TProgram[]) => void;
  reset: () => void;
};

const initialStates: TProgramStates = {
  selected: undefined,
  ids: [],
  dic: {},
};

const programSlice: StateCreator<TProgramActions & TProgramStates> = (
  setter
) => {
  const set = (cb: (base: TProgramStates) => void) => setter(produce(cb));
  return {
    ...initialStates,
    setProgram: ({ members, ...prg }, isSelected) => {
      const { ids, dic } = arrToMap(members);
      set((s) => {
        s.dic[prg.id] = { ...prg, members: ids };
        if (isSelected) {
          s.selected = prg.id;
        }
      });
      getAccountStates.setMultiAccountsByDic(dic);
    },
    setMultiPrograms: (programs) => {
      console.log(programs);
      try {
        let newAccountDic: Record<string, TAccount> = {};
        set((s) => {
          const programIds: string[] = [];
          programs.forEach(({ members, ...prg }) => {
            const { ids, dic } = arrToMap(members);
            s.dic[prg.id] = { ...prg, members: ids };
            programIds.push(prg.id);
            newAccountDic = { ...newAccountDic, ...dic };
          });
          s.ids = [...programIds];
        });
        getAccountStates.setMultiAccountsByDic(newAccountDic);
      } catch (err) {
        console.error("Error when set multi program:", err);
      }
    },
    reset: () => {
      setter(initialStates);
    },
  };
};

export const useProgramState = create<TProgramActions & TProgramStates>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...programSlice(...a),
        }),
        {
          name: "program-store",
          skipHydration: true,
        }
      )
    )
  )
);

export const getProgramStates = useProgramState.getState();
