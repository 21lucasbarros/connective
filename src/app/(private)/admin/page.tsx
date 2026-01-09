"use client";

import { useState } from "react";
import Services from "./components/services";
import Users from "./components/users";
import Coupons from "./components/coupons";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Wrench, Users as UserIcon, Ticket } from "lucide-react";

export default function AdminPage() {
  const [tab, setTab] = useState<"services" | "users" | "coupons">("services");

  return (
    <main className="bg-[#fffcf9] min-h-screen px-4 py-12">
      <div className="max-w-5xl w-full mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#222] mb-2">
            Painel Administrativo
          </h1>
          <p className="text-[#888]">Gerencie serviços e usuários do sistema</p>
        </div>

        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as "services" | "users" | "coupons")}
          className="w-full"
        >
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6 bg-white border border-[#e5e5e5]">
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-[#8338ec] data-[state=active]:text-white"
            >
              <Wrench className="size-4 mr-2" />
              Serviços
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-[#43bccd] data-[state=active]:text-white"
            >
              <UserIcon className="size-4 mr-2" />
              Usuários
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="data-[state=active]:bg-[#f77f00] data-[state=active]:text-white"
            >
              <Ticket className="size-4 mr-2" />
              Cupons
            </TabsTrigger>
          </TabsList>

          <Card className="border border-[#f0f0f0] shadow-sm bg-white">
            <CardContent className="p-0">
              <TabsContent value="services" className="m-0">
                <Services />
              </TabsContent>
              <TabsContent value="users" className="m-0">
                <Users />
              </TabsContent>
              <TabsContent value="coupons" className="m-0">
                <Coupons />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </main>
  );
}
