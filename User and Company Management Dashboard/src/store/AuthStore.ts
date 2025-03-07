import { create } from "zustand";
export type AuthStoreType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  loginAdmin: () => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStoreType>((set) => ({
  isAuthenticated: false,
  isAdmin: false,
  login: () => set({ isAuthenticated: true, }),
  loginAdmin: () => set({ isAuthenticated: true, isAdmin: true }),
  logout: () => set({ isAuthenticated: false, isAdmin: false }),
}));
