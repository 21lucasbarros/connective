"use client";

import React, { useState } from "react";
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
import { Lock, Eye, EyeOff, Shield } from "lucide-react";

interface Props {
  onChangePassword: (payload: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void> | void;
}

export default function SecurityCard({ onChangePassword }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      await onChangePassword({ currentPassword, newPassword, confirmPassword });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Segurança</CardTitle>
        <CardDescription>
          Altere sua senha e gerencie a segurança da sua conta
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Senha Atual</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="currentPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha atual"
              className="pl-10 pr-10"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nova Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Digite sua nova senha"
              className="pl-10 pr-10"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Digite novamente sua nova senha"
              className="pl-10 pr-10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900 font-medium mb-2">
            Requisitos da senha:
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Mínimo de 8 caracteres</li>
            <li>• Pelo menos uma letra maiúscula</li>
            <li>• Pelo menos um número</li>
            <li>• Pelo menos um caractere especial (@, #, $, etc.)</li>
          </ul>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            className="bg-[#8338ec] hover:bg-[#6d28d9]"
            disabled={saving}
          >
            <Shield className="w-4 h-4 mr-2" />
            {saving ? "Alterando..." : "Alterar Senha"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
