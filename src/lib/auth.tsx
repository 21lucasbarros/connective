"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "./auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
    setLoading(false);
  }, [setUser, setLoading]);

  return <>{children}</>;
}

// Re-export para manter compatibilidade
export { useAuth } from "./auth-store";
