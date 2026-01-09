"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data ?? []);
  }

  async function onDelete(id: number) {
    if (!confirm("Deseja realmente excluir esse usuário?")) return;
    await fetch("/api/users", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
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

  return (
    <section className="p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Usuários</h2>
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div>
              <div className="font-medium">
                {u.name}{" "}
                <span className="text-sm text-muted-foreground">
                  ({u.email})
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                Cargo: {u.role ?? "user"}
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <select
                value={u.role ?? "user"}
                onChange={(e) => onChangeRole(u.id, e.target.value)}
                className="px-2 py-1 border rounded-md"
              >
                <option value="user">Usuário</option>
                <option value="admin">Admin</option>
              </select>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(u.id)}
              >
                Remover
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
