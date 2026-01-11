"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronsLeft } from "lucide-react";
import Services from "./components/services";
import Users from "./components/users";
import Coupons from "./components/coupons";
import {
  Users as UserIcon,
  Tag,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = useState<
    "dashboard" | "services" | "users" | "coupons"
  >("dashboard");
  const router = useRouter();

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "coupons",
      label: "Cupons",
      icon: Tag,
    },
    {
      id: "services",
      label: "Serviços",
      icon: Briefcase,
    },
    {
      id: "users",
      label: "Usuários",
      icon: UserIcon,
    },
  ];

  const [coupons, setCoupons] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetchCoupons();
    fetchUsers();
    fetchServices();
  }, []);

  async function fetchCoupons() {
    const res = await fetch("/api/coupons");
    const data = await res.json();
    setCoupons(data ?? []);
  }
  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data ?? []);
  }
  async function fetchServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services ?? data ?? []);
  }

  return (
    <div className="min-h-screen bg-[#f6fcfd]">
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                if (
                  typeof window !== "undefined" &&
                  window.history.length > 1
                ) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
              className="w-10 h-10 flex items-center justify-center p-0 bg-transparent text-black hover:bg-transparent"
            >
              <ChevronsLeft className="size-5 text-black" />
            </Button>
            <h1 className="text-xl font-bold text-[#222]">
              Painel Administrativo
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm">
          {tabs.map((t, idx) => {
            const Icon = t.icon;
            // cores das abas
            const activeColors = [
              "bg-[#8338ec] text-white", // Dashboard
              "bg-[#fc5735] text-white", // Cupons
              "bg-[#43bccd] text-white", // Serviços
              "bg-[#43bccd] text-white", // Usuários
            ];
            const hoverColors = [
              "hover:bg-[#ede7fa]", // Dashboard
              "hover:bg-[#ffe5e0]", // Cupons
              "hover:bg-[#ede7fa]", // Serviços (roxo)
              "hover:bg-[#e0f7fa]", // Usuários (azul)
            ];
            return (
              <Button
                key={t.id}
                variant="ghost"
                onClick={() =>
                  setTab(t.id as "dashboard" | "services" | "users" | "coupons")
                }
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all h-auto ${
                  tab === t.id
                    ? `${activeColors[idx]} hover:${
                        activeColors[idx].split(" ")[0]
                      } hover:text-black`
                    : `text-[#222] ${hoverColors[idx]}`
                }`}
              >
                <Icon
                  size={20}
                  className={
                    tab === t.id
                      ? "text-white group-hover:text-black"
                      : "text-black"
                  }
                />
                {t.label}
              </Button>
            );
          })}
        </nav>

        <main className="min-h-0">
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[#222]">Dashboard</h2>
                <p className="text-[#888] mt-1">
                  Bem-vindo ao painel administrativo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#fc5735] rounded-xl text-white shadow-lg border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <Tag size={24} className="text-black" />
                      </div>
                      <span className="text-3xl font-bold">
                        {coupons.length}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">Cupons Ativos</h3>
                    <p className="text-white text-sm mt-1">
                      {coupons.filter((c) => !c.is_active).length} inativos
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-[#8338ec] rounded-xl text-white shadow-lg border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <Briefcase size={24} className="text-black" />
                      </div>
                      <span className="text-3xl font-bold">
                        {services.length}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">Serviços</h3>
                    <p className="text-white text-sm mt-1">
                      {services.filter((s) => s.is_active !== false).length}{" "}
                      ativos
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-[#43bccd] rounded-xl text-white shadow-lg border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                        <UserIcon size={24} className="text-black" />
                      </div>
                      <span className="text-3xl font-bold">{users.length}</span>
                    </div>
                    <h3 className="text-lg font-semibold">Usuários</h3>
                    <p className="text-white text-sm mt-1">
                      {users.filter((u) => u.role !== "inactive").length} ativos
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white rounded-xl shadow-sm border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-[#222] mb-4">
                    Navegação Rápida
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="ghost"
                      onClick={() => setTab("coupons")}
                      className="flex items-center justify-start gap-3 p-4 rounded-lg hover:bg-[#fff6f3] transition-all group h-auto w-full"
                    >
                      <div className="bg-[#fc5735]/10 p-3 rounded-lg group-hover:bg-[#fc5735]/20 transition-colors">
                        <Tag className="text-[#fc5735]" size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-[#222]">
                          Gerenciar Cupons
                        </h4>
                        <p className="text-sm text-[#888]">
                          Criar e editar cupons
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setTab("services")}
                      className="flex items-center justify-start gap-3 p-4 rounded-lg hover:bg-[#f6f3ff] transition-all group h-auto w-full"
                    >
                      <div className="bg-[#8338ec]/10 p-3 rounded-lg group-hover:bg-[#8338ec]/20 transition-colors">
                        <Briefcase className="text-[#8338ec]" size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-[#222]">
                          Gerenciar Serviços
                        </h4>
                        <p className="text-sm text-[#888]">
                          Adicionar produtos
                        </p>
                      </div>
                    </Button>

                    <Button
                      variant="ghost"
                      onClick={() => setTab("users")}
                      className="flex items-center justify-start gap-3 p-4 rounded-lg hover:bg-[#e0f7fa] transition-all group h-auto w-full"
                    >
                      <div className="bg-[#43bccd]/10 p-3 rounded-lg group-hover:bg-[#43bccd]/20 transition-colors">
                        <UserIcon className="text-[#43bccd]" size={20} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-[#222]">
                          Gerenciar Usuários
                        </h4>
                        <p className="text-sm text-[#888]">
                          Administrar acesso
                        </p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {tab === "services" && <Services />}
          {tab === "users" && <Users />}
          {tab === "coupons" && <Coupons />}
        </main>
      </div>
    </div>
  );
}
