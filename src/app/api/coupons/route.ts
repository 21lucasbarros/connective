import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const code = formData.get("code") as string;
    const discountType = formData.get("discountType") as "PERCENTAGE" | "FIXED";
    const discountValue = Number(formData.get("discountValue"));
    const minimumPurchaseValue = formData.get("minimumPurchaseValue")
      ? Number(formData.get("minimumPurchaseValue"))
      : null;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null;
    const maxUses = formData.get("maxUses")
      ? Number(formData.get("maxUses"))
      : null;

    const result = await db
      .insertInto("coupons")
      .values({
        code,
        discount_type: discountType,
        discount_value: discountValue,
        minimum_purchase_value: minimumPurchaseValue,
        start_date: startDate,
        end_date: endDate,
        max_uses: maxUses,
        used_count: 0,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .executeTakeFirstOrThrow();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao criar cupom" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = Number(formData.get("id"));
    const code = formData.get("code") as string;
    const discountType = formData.get("discountType") as "PERCENTAGE" | "FIXED";
    const discountValue = Number(formData.get("discountValue"));
    const minimumPurchaseValue = formData.get("minimumPurchaseValue")
      ? Number(formData.get("minimumPurchaseValue"))
      : null;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate")
      ? new Date(formData.get("endDate") as string)
      : null;
    const maxUses = formData.get("maxUses")
      ? Number(formData.get("maxUses"))
      : null;

    const result = await db
      .updateTable("coupons")
      .set({
        code,
        discount_type: discountType,
        discount_value: discountValue,
        minimum_purchase_value: minimumPurchaseValue,
        start_date: startDate,
        end_date: endDate,
        max_uses: maxUses,
        updated_at: new Date(),
      })
      .where("id", "=", id)
      .executeTakeFirstOrThrow();

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
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
