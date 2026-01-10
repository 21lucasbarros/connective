import z from "zod";

export const createCouponSchema = z.object({
  code: z
    .string("Código inválido")
    .min(1, "Código é obrigatório")
    .min(3, "Mínimo 3 caracteres"),
  discountType: z.enum(["PERCENTAGE", "FIXED"], "Tipo de desconto inválido"),
  discountValue: z.coerce
    .number("Desconto inválido")
    .min(1, "Desconto é obrigatório"),
  minimumPurchaseValue: z.coerce
    .number("Valor mínimo é inválido")
    .min(0, "Valor mínimo é inválido")
    .nullable(),
  startDate: z.iso.date("Data de início é obrigatória"),
  endDate: z.iso.date("Data de vencimento é inválida").nullable(),
  maxUses: z
    .number("Número máximo de usos inválido")
    .min(0, "Número máximo de usos inválido")
    .nullable(),
});

export const updateCouponSchema = createCouponSchema.extend({
  id: z.coerce.number("ID inválido").min(1, "ID é obrigatório"),
});
