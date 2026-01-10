import { db } from "@/lib/db";
import {
  createCouponSchema,
  updateCouponSchema,
} from "@/lib/validations/coupon";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const coupons = await db.selectFrom("coupons").selectAll().execute();
    return NextResponse.json(coupons);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar cupons" },
      { status: 500 }
    );
  }
}

export type CreateCouponParams = z.infer<typeof createCouponSchema>;
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const coupon = createCouponSchema.parse({
      code: formData.get("code"),
      discountType: formData.get("discountType"),
      discountValue: formData.get("discountValue"),
      minimumPurchaseValue: formData.get("minimumPurchaseValue"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      maxUses: formData.get("maxUses"),
    });

    const result = await db
      .insertInto("coupons")
      .values({
        code: coupon.code,
        discount_type: coupon.discountType,
        discount_value: coupon.discountValue,
        minimum_purchase_value: coupon.minimumPurchaseValue,
        start_date: new Date(coupon.startDate),
        end_date: coupon.endDate ? new Date(coupon.endDate) : undefined,
        max_uses: coupon.maxUses,
        is_active: true,
        used_count: 0,
      })
      .executeTakeFirstOrThrow();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Erro ao criar cupom" }, { status: 500 });
  }
}

export type UpdateCouponParams = z.infer<typeof updateCouponSchema>;
export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const coupon = updateCouponSchema.parse({
      id: formData.get("id"),
      code: formData.get("code"),
      discountType: formData.get("discountType"),
      discountValue: formData.get("discountValue"),
      minimumPurchaseValue: formData.get("minimumPurchaseValue"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      maxUses: formData.get("maxUses"),
    });

    const result = await db
      .updateTable("coupons")
      .set({
        code: coupon.code,
        discount_type: coupon.discountType,
        discount_value: coupon.discountValue,
        minimum_purchase_value: coupon.minimumPurchaseValue,
        start_date: new Date(coupon.startDate),
        end_date: coupon.endDate ? new Date(coupon.endDate) : undefined,
        max_uses: coupon.maxUses,
      })
      .where("id", "=", coupon.id)
      .executeTakeFirstOrThrow();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar cupom" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    await db
      .deleteFrom("coupons")
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao deletar cupom" },
      { status: 500 }
    );
  }
}
