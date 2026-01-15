"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { User } from "@/lib/types";

interface Props {
  user: User | null;
}

export default function AccountInfoCard({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Informações da Conta
        </CardTitle>
        <CardDescription>Detalhes sobre sua conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-sm">Status da Conta</p>
            <p className="text-xs text-gray-500">
              Sua conta está ativa e verificada
            </p>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Ativa
          </Badge>
        </div>

        <div className="flex items-center justify-between py-3 border-b">
          <div>
            <p className="font-medium text-sm">Membro desde</p>
            <p className="text-xs text-gray-500">Data de criação da conta</p>
          </div>
          <p className="text-sm text-gray-600">
            {user?.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : "-"}
          </p>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-sm">Último acesso</p>
            <p className="text-xs text-gray-500">Data do último login</p>
          </div>
          <p className="text-sm text-gray-600">Hoje às 14:30</p>
        </div>
      </CardContent>
    </Card>
  );
}
