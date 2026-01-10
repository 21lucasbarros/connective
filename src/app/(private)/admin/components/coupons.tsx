"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Trash2, Ticket, Percent, Edit } from "lucide-react";
import { ConfirmationModal } from "@/components/ui/confirmation-modal";
import { createCouponSchema } from "@/lib/validations/coupon";
import { CreateCouponParams } from "@/app/api/coupons/route";

export default function Coupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [duplicateCode, setDuplicateCode] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createCouponSchema),
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
    const data = await res.json();
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

  async function onEdit(coupon: any) {
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

  function isExpired(coupon: any): boolean {
    if (!coupon.end_date) return false;
    return new Date(coupon.end_date) < new Date();
  }

  function isActive(coupon: any): boolean {
    return !isExpired(coupon) && coupon.is_active;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("pt-BR");
  }

  function getUsesDisplay(coupon: any): string {
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
      <section className="px-6 py-2">
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
                  <Input
                    id="discountValue"
                    type="number"
                    step="0.01"
                    {...register("discountValue")}
                    placeholder="0.00"
                    className="border-[#2e0202] focus-visible:ring-[#f77f00]"
                    aria-invalid={!!errors.discountValue}
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
                  <Input
                    id="minimumPurchaseValue"
                    type="number"
                    step="1"
                    {...register("minimumPurchaseValue")}
                    placeholder="0"
                    className="border-[#e5e5e5] focus-visible:ring-[#f77f00]"
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
          </CardContent>
        </Card>

        <Separator className="my-8" />

        <div className="mb-6">
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
          <Card className="border border-dashed border-[#e5e5e5]">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="size-16 rounded-full bg-[#f8f8f8] flex items-center justify-center mb-4">
                <Ticket className="size-8 text-[#ccc]" />
              </div>
              <p className="text-[#888] text-sm">
                Nenhum cupom cadastrado ainda
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {coupons.map((coupon) => (
              <Card
                key={coupon.id}
                className="border border-[#f0f0f0] hover:border-[#e0e0e0] transition-colors shadow-sm"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-[#222]">
                          {coupon.code}
                        </h4>
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
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-[#888] text-xs mb-1">Desconto</p>
                          <Badge
                            variant="secondary"
                            className="bg-[#f77f00]/10 text-[#f77f00] border-0 font-medium"
                          >
                            {coupon.discount_type === "PERCENTAGE"
                              ? `${coupon.discount_value}%`
                              : `R$ ${Number(coupon.discount_value).toFixed(
                                  2
                                )}`}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-[#888] text-xs mb-1">
                            Mín. de Compra
                          </p>
                          <p className="font-medium text-[#222]">
                            {coupon.minimum_purchase_value
                              ? `R$ ${Number(
                                  coupon.minimum_purchase_value
                                ).toFixed(2)}`
                              : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#888] text-xs mb-1">Período</p>
                          <p className="font-medium text-[#222] text-xs">
                            {formatDate(coupon.start_date)}
                            {coupon.end_date &&
                              ` a ${formatDate(coupon.end_date)}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#888] text-xs mb-1">Usos</p>
                          <p className="font-medium text-[#222]">
                            {getUsesDisplay(coupon)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
