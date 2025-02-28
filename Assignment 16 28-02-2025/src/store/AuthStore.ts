import { create } from 'zustand';

interface AuthState {
  isAdmin:boolean;
  isAuthenticated: boolean;
  loginUser: () => void;
  loginAdmin: () => void;
  logout: () => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  isAdmin:false,
  isAuthenticated: false,
  loginUser: () => set({ isAuthenticated: true,isAdmin:false }),
  loginAdmin: () =>set({ isAuthenticated: true,isAdmin:true }),
  logout: () => set({ isAuthenticated: false,isAdmin:false }),
}));
