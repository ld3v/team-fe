import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export type TLoadingStates = {
  login: boolean;
  appStatus: boolean;
  listPrograms: boolean;
  loadProject: boolean;
};
export type TLoadingActions = {
  set: (field: keyof TLoadingStates, value: boolean) => void;
};

const loadingSlice: StateCreator<TLoadingActions & TLoadingStates> = (
  setter
) => {
  const set = (cb: (base: TLoadingStates) => void) => setter(produce(cb));

  return {
    appStatus: true,
    login: false,
    listPrograms: false,
    listProjects: false,
    loadProject: false,
    set: (field, isLoading) => {
      set((s) => {
        s[field] = isLoading;
      });
    },
  };
};

export const useLoadingState = create<TLoadingActions & TLoadingStates>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...loadingSlice(...a),
        }),
        {
          name: "loading-store",
          skipHydration: true,
        }
      )
    )
  )
);

export const getLoadingStates = useLoadingState.getState();
