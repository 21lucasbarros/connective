"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Trash2,
  Ticket,
  Percent,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { createCouponSchema } from "@/lib/validations/coupon";
import { CreateCouponParams } from "@/app/api/coupons/route";

type Coupon = {
  id: number;
  code: string;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: number | string;
  minimum_purchase_value: number | null;
  start_date: string;
  end_date: string | null;
  max_uses: number | null;
  is_active?: boolean;
  used_count?: number;
};

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [duplicateCode, setDuplicateCode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(coupons.length / pageSize));
  const pagedCoupons = coupons.slice((page - 1) * pageSize, page * pageSize);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateCouponParams>({
    resolver: zodResolver(createCouponSchema) as Resolver<CreateCouponParams>,
    defaultValues: {
      code: "",
      discountType: "PERCENTAGE",
      discountValue: 0,
      minimumPurchaseValue: null,
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      maxUses: null,
    },
  });

  const discountType = watch("discountType");
  const endDate = watch("endDate");
  const codeValue = watch("code");

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    if (!codeValue.trim()) {
      setDuplicateCode(false);
      return;
    }

    const exists = coupons.some(
      (coupon) =>
        coupon.code.toUpperCase() === codeValue.toUpperCase() &&
        coupon.id !== editingId
    );
    setDuplicateCode(exists);
  }, [codeValue, coupons, editingId]);

  async function fetchCoupons() {
    const res = await fetch("/api/coupons");
    const data = (await res.json()) as Coupon[];
    setCoupons(data);
  }

  async function onSubmit(values: CreateCouponParams) {
    if (duplicateCode) {
      return;
    }

    const formData = new FormData();
    formData.append("code", values.code);
    formData.append("discountType", values.discountType);
    formData.append("discountValue", values.discountValue.toString());
    formData.append("startDate", values.startDate);
    if (values.endDate) formData.append("endDate", values.endDate);
    if (values.maxUses) formData.append("maxUses", values.maxUses.toString());
    if (values.minimumPurchaseValue)
      formData.append(
        "minimumPurchaseValue",
        values.minimumPurchaseValue.toString()
      );

    if (editingId) {
      formData.append("id", editingId.toString());
      await fetch("/api/coupons", { method: "PUT", body: formData });
      setEditingId(null);
    } else {
      await fetch("/api/coupons", { method: "POST", body: formData });
    }

    reset({
      code: "",
      discountType: "PERCENTAGE",
      discountValue: 0,
      minimumPurchaseValue: null,
      startDate: new Date().toISOString().split("T")[0],
      endDate: null,
      maxUses: null,
    });
    fetchCoupons();
  }

  async function onEdit(coupon: Coupon) {
    setEditingId(coupon.id);
    setValue("code", coupon.code);
    setValue("discountType", coupon.discount_type);
    setValue("discountValue", Number(coupon.discount_value));
    setValue(
      "minimumPurchaseValue",
      coupon.minimum_purchase_value
        ? Number(coupon.minimum_purchase_value)
        : null
    );
    setValue("startDate", coupon.start_date.split("T")[0]);
    setValue("endDate", coupon.end_date ? coupon.end_date.split("T")[0] : null);
    setValue("maxUses", coupon.max_uses ?? null);
  }

  async function onDelete(id: number) {
    setDeleteConfirm(id);
  }

  async function confirmDelete() {
    if (deleteConfirm === null) return;
    await fetch("/api/coupons", {
      method: "DELETE",
      body: JSON.stringify({ id: deleteConfirm }),
    });
    setDeleteConfirm(null);
    fetchCoupons();
  }

  function isExpired(coupon: Coupon): boolean {
    if (!coupon.end_date) return false;
    return new Date(coupon.end_date) < new Date();
  }

  function isActive(coupon: Coupon): boolean {
    return !isExpired(coupon) && Boolean(coupon.is_active);
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  function getUsesDisplay(coupon: Coupon): string {
    if (!coupon.max_uses) return "Ilimitado";
    const used = coupon.used_count ?? 0;
    return `${used} de ${coupon.max_uses}`;
  }

  return (
    <>
      <ConfirmationModal
        isOpen={deleteConfirm !== null}
        title="Excluir Cupom"
        message="Deseja realmente excluir esse cupom? Esta ação não pode ser desfeita."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Excluir"
        cancelText="Cancelar"
      />
      <section className="px-6 py-2 min-h-0">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#222] mb-1 flex items-center gap-2">
            <Ticket className="size-5 text-[#f77f00]" />
            {editingId ? "Editar Cupom" : "Novo Cupom"}
          </h3>
          <p className="text-sm text-[#888]">
            {editingId
              ? "Atualize as informações do cupom"
              : "Crie um novo código de desconto"}
          </p>
        </div>

        <Card className="border border-[#f0f0f0] shadow-sm mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="code"
                    className="text-sm font-medium text-[#333]"
                  >
                    Código do Cupom
                  </Label>
                  <Input
                    id="code"
                    {...register("code")}
                    placeholder="Ex: SUMMER2024"
                    className="uppercase border-[#e5e5e5] focus-visible:ring-[#f77f00]"
                    aria-invalid={!!errors.code}
                  />
                  {errors.code && (
                    <p className="text-xs text-[#fc5735]">
                      {errors.code.message}
                    </p>
                  )}
                  {duplicateCode && (
                    <p className="text-xs text-[#fc5735]">
                      Este cupom já existe
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="discountType"
                    className="text-sm font-medium text-[#333]"
                  >
                    Tipo de Desconto
                  </Label>
                  <Select
                    value={discountType}
                    onValueChange={(value) =>
                      setValue("discountType", value as "PERCENTAGE" | "FIXED")
                    }
                  >
                    <SelectTrigger className="border-[#e5e5e5] focus:ring-[#f77f00]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERCENTAGE">Percentual (%)</SelectItem>
                      <SelectItem value="FIXED">Valor Fixo (R$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="discountValue"
                    className="text-sm font-medium text-[#333] flex items-center gap-1"
                  >
                    {discountType === "PERCENTAGE" ? (
                      <>
                        <Percent className="size-3.5" />
                        Desconto (%)
                      </>
                    ) : (
                      <>Desconto (R$)</>
                    )}
                  </Label>
                  <Controller
                    control={control}
                    name="discountValue"
                    defaultValue={0}
                    render={({ field }) => {
                      const formatPercent = (val: number | undefined) =>
                        typeof val === "number"
                          ? `${val.toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}%`
                          : "";

                      const formatCurrency = (val: number | undefined) =>
                        typeof val === "number"
                          ? val.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "";

                      return (
                        <Input
                          id="discountValue"
                          inputMode="numeric"
                          value={
                            discountType === "PERCENTAGE"
                              ? formatPercent(field.value)
                              : formatCurrency(field.value)
                          }
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            const cents =
                              digits === "" ? 0 : parseInt(digits, 10);
                            const numberValue = cents / 100;
                            field.onChange(numberValue);
                          }}
                          onBlur={field.onBlur}
                          placeholder={
                            discountType === "PERCENTAGE" ? "0,00%" : "R$ 0,00"
                          }
                          className="border-[#2e0202] focus-visible:ring-[#f77f00]"
                          aria-invalid={!!errors.discountValue}
                        />
                      );
                    }}
                  />
                  {errors.discountValue && (
                    <p className="text-xs text-[#fc5735]">
                      {errors.discountValue.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="minimumPurchaseValue"
                    className="text-sm font-medium text-[#333]"
                  >
                    Compra Mínima (R$) (opcional)
                  </Label>
                  <Controller
                    control={control}
                    name="minimumPurchaseValue"
                    defaultValue={null}
                    render={({ field }) => {
                      const formatCurrency = (val: number | null | undefined) =>
                        typeof val === "number"
                          ? val.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "";

                      return (
                        <Input
                          id="minimumPurchaseValue"
                          inputMode="numeric"
                          value={formatCurrency(field.value)}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "");
                            if (digits === "") {
                              field.onChange(null);
                              return;
                            }
                            const cents = parseInt(digits, 10);
                            const numberValue = cents / 100;
                            field.onChange(numberValue);
                          }}
                          onBlur={field.onBlur}
                          placeholder="R$ 0,00"
                          className="border-[#e5e5e5] focus-visible:ring-[#f77f00]"
                        />
                      );
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="text-sm font-medium text-[#333]"
                  >
                    Data de Início
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                    className="border-[#e5e5e5] focus-visible:ring-[#f77f00]"
                    aria-invalid={!!errors.startDate}
                  />
                  {errors.startDate && (
                    <p className="text-xs text-[#fc5735]">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="endDate"
                    className="text-sm font-medium text-[#333]"
                  >
                    Data de Expiração (opcional)
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    {...register("endDate")}
                    className="border-[#e5e5e5] focus-visible:ring-[#f77f00]"
                  />
                  {endDate && (
                    <p className="text-xs text-[#888]">
                      Expira em {formatDate(endDate)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="maxUses"
                    className="text-sm font-medium text-[#333]"
                  >
                    Máx. de Usos (opcional)
                  </Label>
                  <Input
                    id="maxUses"
                    type="number"
                    {...register("maxUses", { valueAsNumber: true })}
                    placeholder="Deixe em branco para ilimitado"
                    className="border-[#e5e5e5] focus-visible:ring-[#f77f00]"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#f77f00] hover:bg-[#e67e00] text-white"
                >
                  {isSubmitting
                    ? "Salvando..."
                    : editingId
                    ? "Atualizar Cupom"
                    : "Criar Cupom"}
                </Button>
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      reset();
                    }}
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            </form>

            <Separator className="my-6" />

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[#222] mb-1">
                Cupons Cadastrados
              </h3>
              <p className="text-sm text-[#888]">
                {coupons.length === 0
                  ? "Nenhum cupom cadastrado"
                  : `${coupons.length} ${
                      coupons.length === 1 ? "cupom" : "cupons"
                    } cadastrado(s)`}
              </p>
            </div>

            {coupons.length === 0 ? (
              <div className="border border-dashed border-[#e5e5e5] p-6 rounded">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="size-12 rounded-full bg-[#f8f8f8] flex items-center justify-center mb-3">
                    <Ticket className="size-6 text-[#ccc]" />
                  </div>
                  <p className="text-[#888] text-sm">
                    Nenhum cupom cadastrado ainda
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Desconto</TableHead>
                      <TableHead>Mín. Compra</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Usos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagedCoupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell>
                          <div className="font-medium">{coupon.code}</div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-[#f77f00]/10 text-[#f77f00] border-0 font-medium">
                            {coupon.discount_type === "PERCENTAGE"
                              ? `${coupon.discount_value}%`
                              : `R$ ${Number(coupon.discount_value).toFixed(
                                  2
                                )}`}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {coupon.minimum_purchase_value
                            ? `R$ ${Number(
                                coupon.minimum_purchase_value
                              ).toFixed(2)}`
                            : "—"}
                        </TableCell>
                        <TableCell className="text-sm text-[#666]">
                          {formatDate(coupon.start_date)}
                          {coupon.end_date &&
                            ` a ${formatDate(coupon.end_date)}`}
                        </TableCell>
                        <TableCell>{getUsesDisplay(coupon)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              isActive(coupon)
                                ? "bg-green-100 text-green-700 border-0"
                                : "bg-red-100 text-red-700 border-0"
                            }
                          >
                            {isActive(coupon) ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onEdit(coupon)}
                              className="border-[#e5e5e5] hover:bg-[#f8f8f8]"
                            >
                              <Edit className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onDelete(coupon.id)}
                              className="border-[#e5e5e5] hover:bg-red-50 hover:text-red-600"
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
                  <Pagination aria-label="Coupons pagination">
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
