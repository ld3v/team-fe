import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { TProgram } from "@/common/interfaces";

export type TProgramStates = {
  selected?: string;
  ids: string[];
  dic: Record<string, TProgram>;
};
export type TProgramActions = {
  setProgram: (program: TProgram, isSelected?: boolean) => void;
  setMultiPrograms: (accounts: TProgram[]) => void;
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
    setProgram: (prg, isSelected) => {
      set((s) => {
        s.dic[prg.id] = prg;
        if (isSelected) {
          s.selected = prg.id;
        }
      });
    },
    setMultiPrograms: (programs) => {
      set((s) => {
        programs.forEach((prg) => {
          s.dic[prg.id] = prg;
          s.ids.push(prg.id);
        });
      });
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
