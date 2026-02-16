import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // pega o cookie do usuário
    const userCookie = request.cookies.get("user")?.value;

    if (!userCookie) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    let userId: number;
    try {
      const userData = JSON.parse(userCookie);
      userId = userData.id;
    } catch (error) {
      return NextResponse.json(
        { error: "Erro ao parsed user" },
        { status: 401 },
      );
    }

    // buscar pedido do usuário
    const orders = await db
      .selectFrom("orders")
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
      ])
      .where("orders.user_id", "=", userId)
      .orderBy("orders.created_at", "desc")
      .execute();

    // buscar item de cada pedido
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
    console.error("Error fetching user orders:", error);
    return NextResponse.json(
      { error: "Erro ao buscar pedidos" },
      { status: 500 },
    );
  }
}
