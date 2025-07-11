import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth';

interface AuthActions {
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    
    setUser: (user) => set({ user, isAuthenticated: true }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null, isAuthenticated: false }),
  }))
);

