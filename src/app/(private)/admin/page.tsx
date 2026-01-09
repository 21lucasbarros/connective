"use client";

import { useState } from "react";
import Services from "./components/services";
import Users from "./components/users";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [tab, setTab] = useState<"services" | "users">("services");

  return (
    <main className="bg-[#f7f7f7] min-h-screen flex flex-col text-[#1a1a1a] p-6">
      <div className="max-w-6xl w-full mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <nav aria-label="Admin tabs" className="flex gap-2">
            <Button
              variant={tab === "services" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("services")}
            >
              Serviços
            </Button>
            <Button
              variant={tab === "users" ? "default" : "outline"}
              size="sm"
              onClick={() => setTab("users")}
            >
              Usuários
            </Button>
          </nav>
        </header>

        <section>
          {tab === "services" && <Services />}
          {tab === "users" && <Users />}
        </section>
      </div>
    </main>
  );
}
