"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  DollarSign,
  FileText,
  Sparkles,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";

const serviceSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço inválido"),
  description: z.string().optional().nullable(),
});

type ServiceForm = z.infer<typeof serviceSchema>;
type ServiceItem = z.infer<typeof serviceSchema> & { id: number };

export default function Service() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const {
    register,
    control,
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

  async function onEdit(service: ServiceItem) {
    setEditingId(service.id);
    setValue("name", service.name);
    setValue("price", service.price);
    setValue("description", service.description ?? "");
  }

  async function onDelete(id: number) {
    setDeleteConfirm(id);
  }

  async function confirmDelete() {
    if (deleteConfirm === null) return;
    await fetch("/api/services", {
      method: "DELETE",
      body: JSON.stringify({ id: deleteConfirm }),
    });
    setDeleteConfirm(null);
    fetchServices();
  }

  const totalPages = Math.max(1, Math.ceil(services.length / pageSize));
  const pagedServices = services.slice((page - 1) * pageSize, page * pageSize);

  return (
    <>
      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        title="Excluir Serviço"
        message="Deseja realmente excluir esse serviço? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
      <section className="px-6 py-2 min-h-0">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#222] mb-1 flex items-center gap-2">
            <Sparkles className="size-5 text-[#8338ec]" />
            {editingId ? "Editar Serviço" : "Novo Serviço"}
          </h3>
          <p className="text-sm text-[#888]">
            {editingId
              ? "Atualize as informações do serviço"
              : "Adicione um novo serviço ao catálogo"}
          </p>
        </div>

        <Card className="border border-[#f0f0f0] shadow-sm mb-8">
          <CardContent className="pt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-5"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-[#333]"
                >
                  Nome do Serviço
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Ex: Ajuste de bio"
                  className="border-[#e5e5e5] focus-visible:ring-[#8338ec]"
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-[#fc5735] flex items-center gap-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium text-[#333] flex items-center gap-1"
                >
                  <DollarSign className="size-3.5" />
                  Preço
                </Label>
                <Controller
                  control={control}
                  name="price"
                  defaultValue={0}
                  render={({ field }) => {
                    const formatCurrency = (val: number | undefined) =>
                      typeof val === "number"
                        ? val.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "";

                    return (
                      <Input
                        id="price"
                        inputMode="numeric"
                        value={formatCurrency(field.value)}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, "");
                          const cents =
                            digits === "" ? 0 : parseInt(digits, 10);
                          const numberValue = cents / 100;
                          field.onChange(numberValue);
                        }}
                        onBlur={field.onBlur}
                        placeholder="R$ 0,00"
                        className="border-[#e5e5e5] focus-visible:ring-[#43bccd]"
                        aria-invalid={!!errors.price}
                      />
                    );
                  }}
                />
                {errors.price && (
                  <p className="text-xs text-[#fc5735]">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-sm font-medium text-[#333] flex items-center gap-1"
                >
                  <FileText className="size-3.5" />
                  Descrição (opcional)
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Detalhes sobre o serviço..."
                  className="border-[#e5e5e5] focus-visible:ring-[#8338ec] min-h-20 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#8338ec] hover:bg-[#7030d0] text-white"
                >
                  {isSubmitting ? (
                    "Salvando..."
                  ) : (
                    <>
                      {editingId ? (
                        <Pencil className="size-4 mr-1.5" />
                      ) : (
                        <Plus className="size-4 mr-1.5" />
                      )}
                      {editingId ? "Salvar Alterações" : "Adicionar Serviço"}
                    </>
                  )}
                </Button>
                {editingId && (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      reset({ name: "", price: 0, description: "" });
                    }}
                    className="border-[#e5e5e5]"
                  >
                    <X className="size-4 mr-1.5" />
                    Cancelar
                  </Button>
                )}
              </div>
            </form>

            <Separator className="my-6" />

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#222] mb-1">
                Serviços Cadastrados
              </h3>
              <p className="text-sm text-[#888]">
                {services.length === 0
                  ? "Nenhum serviço cadastrado ainda"
                  : `${services.length} ${
                      services.length === 1 ? "serviço" : "serviços"
                    } disponível`}
              </p>
            </div>

            {services.length === 0 ? (
              <div className="border border-dashed border-[#e5e5e5] p-6 rounded">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="size-12 rounded-full bg-[#f8f8f8] flex items-center justify-center mb-3">
                    <Sparkles className="size-6 text-[#ccc]" />
                  </div>
                  <p className="text-[#888] text-sm">
                    Comece adicionando seu primeiro serviço
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Descrição
                      </TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagedServices.map((s: ServiceItem) => (
                      <TableRow key={s.id}>
                        <TableCell>
                          <div className="font-medium">{s.name}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[#8338ec]/10 text-[#8338ec] border-0 font-medium">
                            R$ {Number(s.price).toFixed(2)}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-[#666]">
                          {s.description ?? "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onEdit(s)}
                              className="hover:bg-[#8338ec]/10 hover:text-[#8338ec]"
                              title="Editar serviço"
                            >
                              <Pencil className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onDelete(s.id)}
                              className="hover:bg-[#fc5735]/10 hover:text-[#fc5735]"
                              title="Excluir serviço"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4">
                  <Pagination aria-label="Services pagination">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          aria-disabled={page === 1}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={page === i + 1}
                            onClick={() => setPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                          aria-disabled={page === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
