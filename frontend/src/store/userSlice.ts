import { StateCreator } from 'zustand';
import { TUser } from '../types/TUser';
import { api } from '@/lib/axios';

export interface UserSlice {
  users: TUser[];
  currentUser: TUser | null;
  token: string | null;
  role: string | null;
  setUsers: (users: TUser[]) => void;
  setCurrentUser: (user: TUser | null) => void;
  setToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
  logout: () => Promise<void>;
}

export const createUserSlice: StateCreator<UserSlice> = (set, get) => ({
  users: [],
  currentUser: null,
  token: null,
  role: null,
  setUsers: (users) => set({ users }),
  setCurrentUser: (user) => set({ currentUser: user }),
  setToken: (token) => set({ token }),
  setRole: (role) => set({ role }),
  logout: async () => {
    try {
      const token = get().token;
      if (token) {
        await api.post('/logout', null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ currentUser: null, token: null, role: null});
    }
  },
});
