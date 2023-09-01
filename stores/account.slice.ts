import { create, StateCreator } from "zustand";
import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import { TAccount } from "@/common/interfaces";

export type TAccountStates = {
  current?: string;
  dic: Record<string, TAccount>;
};
export type TAccountActions = {
  setAccount: (account: TAccount, isCurrent?: boolean) => void;
  setMultiAccounts: (accounts: TAccount[]) => void;
  reset: () => void;
};

const initialStates: TAccountStates = {
  current: undefined,
  dic: {},
};

const accountSlice: StateCreator<TAccountActions & TAccountStates> = (
  setter
) => {
  const set = (cb: (base: TAccountStates) => void) => setter(produce(cb));
  return {
    ...initialStates,
    setAccount: (acc, isCurrent) => {
      set((s) => {
        s.dic[acc.id] = acc;
        if (isCurrent) {
          s.current = acc.id;
        }
      });
    },
    setMultiAccounts: (accounts) => {
      set((s) => {
        accounts.forEach((acc) => (s.dic[acc.id] = acc));
      });
    },
    reset: () => {
      setter(initialStates);
    },
  };
};

export const useAccountState = create<TAccountActions & TAccountStates>()(
  immer(
    devtools(
      persist(
        (...a) => ({
          ...accountSlice(...a),
        }),
        {
          name: "account-store",
          skipHydration: true,
        }
      )
    )
  )
);

export const getAccountStates = useAccountState.getState();
