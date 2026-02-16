"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import PersonalInfoCard from "./components/personal-info-card";
import SecurityCard from "./components/security-card";
import AccountInfoCard from "./components/account-info-card";
import DangerZoneCard from "./components/danger-zone-card";
import type { User } from "@/lib/types";
import { useAuthStore } from "@/lib/auth-store";

export default function EditarDadosPage() {
  const { user: authUser, setUser } = useAuthStore();
  const [user, setCurrentUser] = useState<User | null>(null);
  const [patch, setPatch] = useState<Partial<User>>({});

  useEffect(() => {
    // try to load current user id from localStorage (set at login)
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { id?: number } | null;
      if (!parsed?.id) return;
      fetch(`/api/users/${parsed.id}`)
        .then((r) => r.json())
        .then((data: User | { error: string }) => {
          if (!("error" in data)) setCurrentUser(data as User);
        })
        .catch((e) => console.error("Failed to fetch user:", e));
    } catch (e: unknown) {
      console.error(e);
    }
  }, []);

  function handleChangeLocal(p: Partial<User>) {
    setPatch((prev) => ({ ...prev, ...p }));
    setCurrentUser((u) => (u ? { ...u, ...p } : u));
  }

  async function handleSave() {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) throw new Error("Usuário não encontrado no localStorage");
      const parsed = JSON.parse(raw) as {
        id: number;
        name?: string;
        email?: string;
      };
      const id = parsed.id;
      const res = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Erro ao atualizar usuário");
      }
      // Optionally update localStorage user email/name
      const updatedLocal = {
        ...parsed,
        ...(patch.email ? { email: patch.email } : {}),
        ...(patch.name ? { name: patch.name } : {}),
      };
      localStorage.setItem("user", JSON.stringify(updatedLocal));
      setUser(updatedLocal);
      setPatch({});
      alert("Informações pessoais atualizadas com sucesso!");
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      alert(msg ?? "Erro ao salvar");
    }
  }

  async function handleChangePassword(payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    // No change-password API implemented; placeholder behavior
    if (payload.newPassword !== payload.confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    alert("Senha alterada com sucesso (placeholder)");
  }

  async function handleDeleteAccount() {
    if (
      !confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação é permanente.",
      )
    )
      return;
    try {
      const raw = localStorage.getItem("user");
      if (!raw) throw new Error("Usuário não encontrado");
      const parsed = JSON.parse(raw);
      // call existing users DELETE route
      const res = await fetch(`/api/users`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: parsed.id }),
      });
      if (!res.ok) throw new Error("Erro ao excluir conta");
      setUser(null);
      localStorage.removeItem("user");
      alert("Conta excluída");
      window.location.href = "/";
    } catch (e: unknown) {
      console.error(e);
      const msg = e instanceof Error ? e.message : String(e);
      alert(msg ?? "Erro ao excluir conta");
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="mb-4 -ml-2 text-gray-600 hover:text-[#8338ec]"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#8338ec]">
          Meus Dados
        </h1>
        <p className="text-gray-600">
          Gerencie suas informações pessoais e configurações de segurança
        </p>
      </div>

      <div className="space-y-6">
        <PersonalInfoCard
          user={user}
          onChangeAction={handleChangeLocal}
          onSaveAction={handleSave}
        />
        <SecurityCard onChangePasswordAction={handleChangePassword} />
        <AccountInfoCard user={user} />
        <DangerZoneCard onDelete={handleDeleteAccount} />
      </div>
    </div>
  );
}
