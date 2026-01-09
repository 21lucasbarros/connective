"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Mail, Shield, Trash2, UserCircle, Crown } from "lucide-react";
import { User } from "@/lib/db";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function UsersComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data ?? []);
  }

  async function onDelete(id: number) {
    setDeleteConfirm(id);
  }

  async function confirmDelete() {
    if (deleteConfirm === null) return;
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id: deleteConfirm }),
    });
    setDeleteConfirm(null);
    fetchUsers();
  }

  async function onChangeRole(id: number, role: string) {
    await fetch("/api/users", {
      method: "PATCH",
      body: JSON.stringify({ id, role }),
      headers: { "Content-Type": "application/json" },
    });
    fetchUsers();
  }

  const adminUsers = users.filter((u) => u.role === "admin");
  const regularUsers = users.filter((u) => u.role !== "admin");

  return (
    <>
      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        title="Excluir Usuário"
        message="Deseja realmente excluir esse usuário? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
      <section className="px-6 py-2">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#222] mb-1 flex items-center gap-2">
            <Users className="size-5 text-[#43bccd]" />
            Gerenciar Usuários
          </h3>
          <p className="text-sm text-[#888]">
            {users.length === 0
              ? "Nenhum usuário cadastrado"
              : `${users.length} ${
                  users.length === 1 ? "usuário" : "usuários"
                } no sistema`}
          </p>
        </div>

        {users.length === 0 ? (
          <Card className="border border-dashed border-[#e5e5e5]">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-16 rounded-full bg-[#f8f8f8] flex items-center justify-center mb-4">
                <Users className="size-8 text-[#ccc]" />
              </div>
              <p className="text-[#888] text-sm">
                Nenhum usuário cadastrado ainda
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {adminUsers.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="size-4 text-[#ffba08]" />
                  <h4 className="text-sm font-semibold text-[#666] uppercase tracking-wide">
                    Administradores ({adminUsers.length})
                  </h4>
                </div>
                <div className="grid gap-3">
                  {adminUsers.map((u) => (
                    <Card
                      key={u.id}
                      className="border border-[#f0f0f0] hover:border-[#e0e0e0] transition-colors shadow-sm"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="size-12 rounded-full bg-linear-to-br from-[#8338ec] to-[#43bccd] flex items-center justify-center shrink-0">
                              <UserCircle className="size-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-semibold text-[#222] text-base truncate">
                                  {u.name}
                                </h5>
                                <Badge className="bg-[#ffba08]/20 text-[#ffba08] border-0 font-medium shrink-0">
                                  <Crown className="size-3 mr-1" />
                                  Admin
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1.5 text-sm text-[#666]">
                                <Mail className="size-3.5" />
                                <span className="truncate">{u.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center shrink-0">
                            <Select
                              value={u.role ?? "user"}
                              onValueChange={(role) => onChangeRole(u.id, role)}
                            >
                              <SelectTrigger className="w-32.5 border-[#e5e5e5] focus:ring-[#8338ec]">
                                <Shield className="size-3.5 mr-1.5" />
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Usuário</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(u.id)}
                              className="hover:bg-[#fc5735]/10 hover:text-[#fc5735]"
                              title="Remover usuário"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {adminUsers.length > 0 && regularUsers.length > 0 && <Separator />}

            {regularUsers.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <UserCircle className="size-4 text-[#43bccd]" />
                  <h4 className="text-sm font-semibold text-[#666] uppercase tracking-wide">
                    Usuários ({regularUsers.length})
                  </h4>
                </div>
                <div className="grid gap-3">
                  {regularUsers.map((u) => (
                    <Card
                      key={u.id}
                      className="border border-[#f0f0f0] hover:border-[#e0e0e0] transition-colors shadow-sm"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="size-12 rounded-full bg-[#f0f0f0] flex items-center justify-center shrink-0">
                              <UserCircle className="size-7 text-[#999]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-[#222] text-base mb-1 truncate">
                                {u.name}
                              </h5>
                              <div className="flex items-center gap-1.5 text-sm text-[#666]">
                                <Mail className="size-3.5" />
                                <span className="truncate">{u.email}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 items-center shrink-0">
                            <Select
                              value={u.role ?? "user"}
                              onValueChange={(role) => onChangeRole(u.id, role)}
                            >
                              <SelectTrigger className="w-32.5 border-[#e5e5e5] focus:ring-[#43bccd]">
                                <Shield className="size-3.5 mr-1.5" />
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">Usuário</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(u.id)}
                              className="hover:bg-[#fc5735]/10 hover:text-[#fc5735]"
                              title="Remover usuário"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
