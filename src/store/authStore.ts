import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';
import type { UserRole } from '@/lib/database.types';

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_verified?: boolean;
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  setLoading: (v: boolean) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isCandidate: () => boolean;
  isRecruiter: () => boolean;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,

      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),

      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },

      refreshUser: async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (!authUser) { set({ user: null, loading: false }); return; }

        const { data: profile } = await supabase
          .from('profiles').select('*').eq('id', authUser.id).single();

        if (profile) {
          set({
            user: {
              id: authUser.id,
              email: authUser.email!,
              role: profile.role as UserRole,
              first_name: profile.first_name,
              last_name: profile.last_name,
              avatar_url: profile.avatar_url,
              is_verified: profile.is_verified,
            },
            loading: false,
          });
        } else {
          set({ user: null, loading: false });
        }
      },

      isCandidate: () => get().user?.role === 'CANDIDATE',
      isRecruiter: () => get().user?.role === 'RECRUITER',
      isAdmin: () => get().user?.role === 'ADMIN',
    }),
    {
      name: 'clearhire-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
