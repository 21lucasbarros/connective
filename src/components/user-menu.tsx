import { User, LogOut, Home, MapPin, UserCog } from "lucide-react";
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

interface UserData {
  name?: string;
  email?: string;
  role?: string;
}

export default function UserMenu() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Bom dia";
    if (hour >= 12 && hour < 18) return "Boa tarde";
    return "Boa noite";
  }

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
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
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
        <DropdownMenuItem onClick={() => (window.location.href = "/enderecos")}>
          <MapPin className="w-4 h-4" /> Endereços
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} variant="destructive">
          <LogOut className="w-4 h-4" /> Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
