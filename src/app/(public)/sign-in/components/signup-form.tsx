"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/lib/auth-store";

function validateCPFValue(raw?: string) {
  if (!raw) return true;
  const cpf = raw.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;

  return true;
}

const signupSchema = z
  .object({
    first_name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    last_name: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
    phone: z
      .string()
      .optional()
      .refine((v) => !v || v.replace(/\D/g, "").length >= 10, {
        message: "Telefone inválido",
      }),
    cpf: z
      .string()
      .optional()
      .refine((v) => validateCPFValue(v), { message: "CPF inválido" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onErrorAction: (error: string) => void;
  onToggleAction: () => void;
}

export function SignupForm({ onErrorAction, onToggleAction }: SignupFormProps) {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      cpf: "",
    },
  });

  async function onSubmit(values: SignupForm) {
    try {
      onErrorAction("");
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${values.first_name} ${values.last_name}`,
          email: values.email,
          password: values.password,
          phone: values.phone,
          cpf: values.cpf,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        onErrorAction(data.error || "Erro ao registrar");
        return;
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      router.push("/");
    } catch (error) {
      onErrorAction("Erro ao conectar ao servidor");
    }
  }

  const formatPhone = (value = "") => {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10)
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  const formatCPF = (value = "") => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto flex items-start justify-center bg-linear-to-br from-purple-50 via-white to-purple-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center my-auto">
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-linear-to-br from-[#8338ec] to-[#6d28d9] mb-3 shadow-lg shadow-purple-200">
            <User className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Criar sua conta
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Preencha seus dados para começar
          </p>
        </div>

        <Card className="w-full border-gray-100 shadow-xl">
          <CardContent className="p-5 sm:p-6 md:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="first_name"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Nome
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="João"
                    {...register("first_name")}
                    aria-invalid={!!errors.first_name}
                    className={`pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                      errors.first_name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                    }`}
                  />
                </div>
                {errors.first_name && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <span className="font-medium">⚠</span>{" "}
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="last_name"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Sobrenome
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Silva"
                    {...register("last_name")}
                    aria-invalid={!!errors.last_name}
                    className={`pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                      errors.last_name
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                    }`}
                  />
                </div>
                {errors.last_name && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <span className="font-medium">⚠</span>{" "}
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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

              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    aria-invalid={!!errors.confirmPassword}
                    className={`pl-9 sm:pl-11 pr-9 sm:pr-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                      errors.confirmPassword
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                    }`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-transparent"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <span className="font-medium">⚠</span>{" "}
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  Telefone <span className="text-gray-400">(opcional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    {...register("phone")}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setValue("phone", formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    aria-invalid={!!errors.phone}
                    className={`pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                      errors.phone
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <span className="font-medium">⚠</span>{" "}
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2">
                <Label
                  htmlFor="cpf"
                  className="text-xs sm:text-sm font-medium text-gray-700"
                >
                  CPF <span className="text-gray-400">(opcional)</span>
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    {...register("cpf")}
                    onChange={(e) => {
                      const formatted = formatCPF(e.target.value);
                      setValue("cpf", formatted, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    aria-invalid={!!errors.cpf}
                    className={`pl-9 sm:pl-11 h-10 sm:h-12 text-sm sm:text-base transition-all ${
                      errors.cpf
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300 focus-visible:ring-[#8338ec] focus-visible:border-[#8338ec]"
                    }`}
                  />
                </div>
                {errors.cpf && (
                  <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <span className="font-medium">⚠</span> {errors.cpf.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full h-10 sm:h-12 rounded-xl font-semibold text-sm sm:text-base bg-linear-to-r from-[#8338ec] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white transition-all shadow-lg shadow-purple-200 hover:shadow-xl hover:shadow-purple-300 disabled:opacity-50 disabled:cursor-not-allowed group mt-2"
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
                  Registrando...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Criar conta
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        <p className="text-center mt-4 sm:mt-5 text-xs sm:text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Button
            variant="link"
            onClick={() => onToggleAction()}
            className="h-auto p-0 text-xs sm:text-sm text-[#8338ec] hover:text-[#6d28d9] font-semibold"
          >
            Entrar
          </Button>
        </p>
      </div>
    </div>
  );
}
