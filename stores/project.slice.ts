import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { TAccount, TProject, TProjectMember } from "@/common/interfaces";
import { arrToMap } from "@/common/utils";
import { getAccountStates } from ".";

export type TProjectStates = {
  selected?: string;
  ids: string[];
  dic: Record<string, Omit<TProject, "members"> & { members: string[] }>;
  memDic: Record<string, TProjectMember>;
};
export type TProjectActions = {
  setProject: (project: TProject, isSelected?: boolean) => void;
  setMultiProjects: (projects: TProject[]) => void;
  reset: () => void;
};

const initialStates: TProjectStates = {
  selected: undefined,
  ids: [],
  dic: {},
  memDic: {},
};

const projectSlice: StateCreator<TProjectActions & TProjectStates> = (
  setter
) => {
  const set = (cb: (base: TProjectStates) => void) => setter(produce(cb));
  return {
    ...initialStates,
    setProject: ({ members, ...prj }, isSelected) => {
      const { ids, dic } = arrToMap(members);
      set((s) => {
        s.dic[prj.id] = { ...prj, members: ids };
        s.memDic = { ...s.memDic, ...dic };
        if (isSelected) {
          s.selected = prj.id;
        }
      });
    },
    setMultiProjects: (projects) => {
      try {
        set((s) => {
          projects.forEach(({ members, ...prj }) => {
            const { ids, dic } = arrToMap(members);
            s.dic[prj.id] = { ...prj, members: ids };
            s.memDic = { ...s.memDic, ...dic };
          });
        });
      } catch (err) {
        console.error("Error when set multi projects:", err);
      }
    },
    reset: () => {
      setter(initialStates);
    },
  };
};

export const useProjectState = create<TProjectActions & TProjectStates>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...projectSlice(...a),
        }),
        {
          name: "program-store",
          skipHydration: true,
        }
      )
    )
  )
);

export const getProjectStates = useProjectState.getState();
