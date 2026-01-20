"use client";

import { useState } from "react";
import type { User } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Save } from "lucide-react";

interface Props {
  user: User | null;
  onChangeAction: (patch: Partial<User>) => void;
  onSaveAction: () => Promise<void> | void;
}

export default function PersonalInfoCard({
  user,
  onChangeAction,
  onSaveAction,
}: Props) {
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onSaveAction();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Informações Pessoais
        </CardTitle>
        <CardDescription>Atualize seus dados cadastrais</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              id="firstName"
              value={user?.name ?? ""}
              onChange={(e) => onChangeAction({ name: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              value={user?.email ?? ""}
              onChange={(e) => onChangeAction({ email: e.target.value })}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-gray-500">
            Este e-mail será usado para login e notificações
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="phone"
              value={user?.phone ?? ""}
              onChange={(e) => onChangeAction({ phone: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            value={user?.cpf ?? ""}
            disabled
            className="bg-gray-50"
          />
          <p className="text-xs text-gray-500">O CPF não pode ser alterado</p>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            className="bg-[#8338ec] hover:bg-[#6d28d9]"
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
