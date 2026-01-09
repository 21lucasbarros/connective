"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onError: (error: string) => void;
}

export function LoginForm({ onError }: LoginFormProps) {
  const router = useRouter();
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
      onError("");
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        onError(data.error || "Erro ao fazer login");
        return;
      }

      // Salvar em localStorage e cookie
      localStorage.setItem("user", JSON.stringify(data.user));
      document.cookie = `user=${JSON.stringify(data.user)}; path=/; max-age=${
        60 * 60 * 24 * 7
      }`;
      router.push("/");
    } catch (error) {
      onError("Erro ao conectar ao servidor");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mt-8 w-full max-w-sm rounded-xl bg-[#fffcf9] shadow-lg p-8 flex flex-col gap-6 border border-[#f3f3f3]"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-[#222]">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          aria-invalid={!!errors.email}
          className={
            errors.email
              ? "border-[#fc5735] focus-visible:ring-[#fc5735]"
              : "focus-visible:ring-[#8338ec]"
          }
        />
        {errors.email && (
          <span className="text-xs text-[#fc5735] mt-1">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-[#222]">
          Senha
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          aria-invalid={!!errors.password}
          className={
            errors.password
              ? "border-[#fc5735] focus-visible:ring-[#fc5735]"
              : "focus-visible:ring-[#8338ec]"
          }
        />
        {errors.password && (
          <span className="text-xs text-[#fc5735] mt-1">
            {errors.password.message}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-10 rounded-md font-semibold text-base bg-[#8338ec] hover:bg-[#6d28d9] text-[#fffcf9] transition-colors"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
