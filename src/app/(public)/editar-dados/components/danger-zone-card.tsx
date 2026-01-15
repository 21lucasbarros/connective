"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  onDelete?: () => void;
}

export default function DangerZoneCard({ onDelete }: Props) {
  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
        <CardDescription>Ações irreversíveis com sua conta</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-sm">Excluir Conta</p>
            <p className="text-xs text-gray-500">
              Esta ação é permanente e não pode ser desfeita
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            Excluir Conta
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
