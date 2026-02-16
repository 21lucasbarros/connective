import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const orders = await db
      .selectFrom("orders")
      .leftJoin("user", "orders.user_id", "user.id")
      .select([
        "orders.id",
        "orders.user_id",
        "orders.status",
        "orders.total_amount",
        "orders.coupon_id",
        "orders.payment_method",
        "orders.payment_status",
        "orders.created_at",
        "orders.updated_at",
        "user.name",
        "user.email",
      ])
      .orderBy("orders.created_at", "desc")
      .execute();

    const ordersWithItems = await Promise.all(
      orders.map(async (order) => {
        const items = await db
          .selectFrom("order_items")
          .leftJoin("services", "order_items.service_id", "services.id")
          .select([
            "order_items.id",
            "order_items.order_id",
            "order_items.service_id",
            "order_items.quantity",
            "order_items.unit_price",
            "order_items.subtotal",
            "order_items.created_at",
            "services.name as service_name",
          ])
          .where("order_items.order_id", "=", order.id)
          .execute();

        return {
          ...order,
          items,
        };
      }),
    );

    return NextResponse.json(ordersWithItems);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 },
    );
  }
}
