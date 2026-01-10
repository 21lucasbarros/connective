"use client";

import { User, LogOut, Home, MapPin } from "lucide-react";
import { FaUserTie } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const userStr =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userStr) {
        setUser(JSON.parse(userStr));
      }
    } catch {}
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
  };

  return (
    <>
      {loading ? null : !user ? (
        <Button
          type="button"
          variant="ghost"
          aria-label="Usuário"
          onClick={() => (window.location.href = "/sign-in")}
          className="cursor-pointer"
        >
          <User className="text-(--color-roxo) w-16 h-16" size={64} />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              aria-label="Menu do usuário"
              className="cursor-pointer"
            >
              {user.role === "admin" ? (
                <FaUserTie
                  className="text-(--color-roxo) w-16 h-16"
                  size={64}
                />
              ) : (
                <User className="text-(--color-roxo) w-16 h-16" size={64} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              Olá, {user.name || user.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role === "admin" && (
              <DropdownMenuItem
                onClick={() => (window.location.href = "/admin")}
              >
                <FaUserTie className="w-4 h-4" /> Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => (window.location.href = "/")}>
              {" "}
              <Home className="w-4 h-4" /> Início{" "}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => (window.location.href = "/enderecos")}
            >
              {" "}
              <MapPin className="w-4 h-4" /> Endereços{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} variant="destructive">
              {" "}
              <LogOut className="w-4 h-4" /> Sair{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
