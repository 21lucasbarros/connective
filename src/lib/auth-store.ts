"use client";

import { create } from "zustand";

interface UserData {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}

type AuthStore = {
  user: UserData | null;
  setUser: (u: UserData | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  setUser: (user: UserData | null) => set({ user }),

  setLoading: (loading: boolean) => set({ loading }),

  logout: async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }

    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }

    set({ user: null });

    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
  },
}));

// Hook compatível com o antigo
export function useAuth() {
  const store = useAuthStore();
  return {
    user: store.user,
    setUser: store.setUser,
    loading: store.loading,
    logout: store.logout,
  };
}
