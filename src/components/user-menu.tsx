import { User, LogOut, Home, UserCog } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";

interface UserData {
  name?: string;
  email?: string;
  role?: string;
}

export default function UserMenu() {
  const { user, loading, logout } = useAuth();

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  }

  const handleLogout = async () => {
    logout();
  };

  if (loading) return null;

  if (!user) {
    return (
      <Button
        type="button"
        variant="ghost"
        aria-label="Usuário"
        onClick={() => (window.location.href = "/sign-in")}
        className="cursor-pointer p-2"
      >
        <User className="text-(--color-roxo) w-6 h-6" size={24} />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label="Menu do usuário"
          className="cursor-pointer p-2"
        >
          {user.role === "admin" ? (
            <UserCog className="text-(--color-roxo) w-6 h-6" size={24} />
          ) : (
            <User className="text-(--color-roxo) w-6 h-6" size={24} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {getGreeting()}, {user.name || user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "admin" && (
          <DropdownMenuItem onClick={() => (window.location.href = "/admin")}>
            <UserCog className="w-4 h-4" /> Admin
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => (window.location.href = "/")}>
          <Home className="w-4 h-4" /> Início
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => (window.location.href = "/editar-dados")}
        >
          <User className="w-4 h-4" /> Editar dados
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut className="w-4 h-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
