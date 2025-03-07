import { create } from "zustand";
import { User } from "../models/User";

export type userStoreType = {
  users: User[];
  setUsers: (users: User[]) => void;
  storeUserinContext: (user: User) => void;
};

export const useUserStore = create<userStoreType>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  storeUserinContext: (user) =>
    set((state) => ({ users: [...state.users, user] })),
}));
