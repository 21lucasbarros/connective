"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
}

export function SignupForm({ onErrorAction }: SignupFormProps) {
  const router = useRouter();
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
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(
      7,
      11
    )}`;
  };

  const formatCPF = (value = "") => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
      6,
      9
    )}-${digits.slice(9)}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            {...register("first_name")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
            aria-invalid={!!errors.first_name}
          />
          {errors.first_name && (
            <p className="text-sm text-destructive mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sobrenome</label>
          <input
            {...register("last_name")}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
            aria-invalid={!!errors.last_name}
          />
          {errors.last_name && (
            <p className="text-sm text-destructive mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Senha</label>
        <input
          type="password"
          {...register("password")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-destructive mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Confirmar Senha
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Telefone</label>
        <input
          {...register("phone")}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            setValue("phone", formatted, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">
            {errors.phone.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">CPF</label>
        <input
          {...register("cpf")}
          onChange={(e) => {
            const formatted = formatCPF(e.target.value);
            setValue("cpf", formatted, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-(--color-roxo)"
        />
        {errors.cpf && (
          <p className="text-sm text-destructive mt-1">{errors.cpf.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-(--color-roxo) hover:bg-(--color-roxo)/90"
      >
        {isSubmitting ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
}
