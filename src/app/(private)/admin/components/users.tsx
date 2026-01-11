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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

export default function UsersComponent() {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 8;

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

  const allUsers = [...adminUsers, ...regularUsers];
  const totalPages = Math.max(1, Math.ceil(allUsers.length / pageSize));
  const pagedUsers = allUsers.slice((page - 1) * pageSize, page * pageSize);

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
      <section className="px-6 py-2 min-h-0">
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
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UserCircle className="size-4 text-[#43bccd]" />
                <h4 className="text-sm font-semibold text-[#666] uppercase tracking-wide">
                  Usuários ({users.length})
                </h4>
              </div>

              <Card className="border border-[#f0f0f0] shadow-sm">
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pagedUsers.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-full bg-[#f0f0f0] flex items-center justify-center">
                                <UserCircle className="size-6 text-[#999]" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium truncate">
                                  {u.name}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="truncate">{u.email}</TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-4">
                    <Pagination aria-label="Users pagination">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            aria-disabled={page === 1}
                          />
                        </PaginationItem>

                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={page === i + 1}
                              onClick={() => setPage(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setPage((p) => Math.min(totalPages, p + 1))
                            }
                            aria-disabled={page === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
