"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onErrorAction: (error: string) => void;
  onToggleAction: () => void;
}

export function LoginForm({ onErrorAction, onToggleAction }: LoginFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginForm) {
    try {
      onErrorAction("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        onErrorAction(data.error || "Erro ao fazer login");
        return;
      }

      // Salvar em localStorage e cookie
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      router.push("/");
    } catch (error) {
      onErrorAction("Erro ao conectar ao servidor");
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden flex items-center justify-center bg-linear-to-br from-purple-50 via-white to-purple-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-[#8338ec] to-[#6d28d9] mb-3 shadow-lg shadow-purple-200">
            <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Entre com suas credenciais para continuar
          </p>
        </div>

        <Card className="w-full border-gray-100 shadow-xl">
          <CardContent className="p-5 sm:p-6 md:p-8 space-y-4 sm:space-y-5">
            <div className="space-y-1.5 sm:space-y-2">
              <Label
                htmlFor="email"
                className="text-xs sm:text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  className={`pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                  <span className="font-medium">⚠</span> {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs sm:text-sm text-[#8338ec] hover:text-[#6d28d9] font-medium"
                >
                  Esqueceu a senha?
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  className={`pl-9 sm:pl-11 pr-9 sm:pr-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                  }`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                  <span className="font-medium">⚠</span>{" "}
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
                className="data-[state=checked]:bg-[#8338ec] data-[state=checked]:border-[#8338ec]"
              />
              <Label
                htmlFor="remember"
                className="text-xs sm:text-sm text-gray-700 font-normal cursor-pointer"
              >
                Manter-me conectado
              </Label>
            </div>

            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full h-10 sm:h-12 rounded-xl font-semibold text-sm sm:text-base bg-linear-to-r from-[#8338ec] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white transition-all shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Entrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Entrar
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center mt-4 sm:mt-5 text-xs sm:text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Button
            variant="link"
            onClick={() => onToggleAction()}
            className="h-auto p-0 text-xs sm:text-sm text-[#8338ec] hover:text-[#6d28d9] font-semibold"
          >
            Criar conta
          </Button>
        </p>
      </div>
    </div>
  );
}
