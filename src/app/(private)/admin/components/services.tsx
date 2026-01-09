"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const serviceSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço inválido"),
  description: z.string().optional().nullable(),
});

type ServiceForm = z.infer<typeof serviceSchema>;

export default function Service() {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ServiceForm>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: "", price: 0, description: "" },
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    const res = await fetch("/api/services");
    const data = await res.json();
    setServices(data.services ?? data);
  }

  async function onSubmit(values: ServiceForm) {
    if (editingId) {
      const formData = new FormData();
      formData.append("id", String(editingId));
      formData.append("name", values.name);
      formData.append("price", String(values.price));
      formData.append("description", values.description ?? "");

      await fetch("/api/services", {
        method: "PUT",
        body: formData,
      });
      setEditingId(null);
    } else {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", String(values.price));
      formData.append("description", values.description ?? "");

      await fetch("/api/services", { method: "POST", body: formData });
    }

    reset({ name: "", price: 0, description: "" });
    fetchServices();
  }

  async function onEdit(service: any) {
    setEditingId(service.id);
    setValue("name", service.name);
    setValue("price", service.price);
    setValue("description", service.description ?? "");
  }

  async function onDelete(id: number) {
    if (!confirm("Deseja realmente excluir esse serviço?")) return;
    await fetch("/api/services", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchServices();
  }

  return (
    <section className="p-6 bg-white rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Serviços</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 max-w-xl"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            {...register("name")}
            className="w-full px-3 py-2 border rounded-md"
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
            className="w-full px-3 py-2 border rounded-md"
            aria-invalid={!!errors.price}
          />
          {errors.price && (
            <p className="text-sm text-destructive">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea
            {...register("description")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex gap-2 items-center">
          <Button type="submit" disabled={isSubmitting}>
            {editingId ? "Salvar" : "Adicionar"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                setEditingId(null);
                reset({ name: "", price: 0, description: "" });
              }}
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>

      <hr className="my-6" />

      <div className="space-y-3">
        {services.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between p-3 border rounded-md"
          >
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-muted-foreground">
                R$ {Number(s.price).toFixed(2)}
              </div>
              {s.description && (
                <div className="text-sm mt-1">{s.description}</div>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(s)}>
                Editar
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(s.id)}
              >
                Excluir
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
