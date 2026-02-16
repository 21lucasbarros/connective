"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";

interface OrderItem {
  id: number;
  order_id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  service_name: string;
}

interface Order {
  id: number;
  user_id: number;
  status: string;
  total_amount: number;
  coupon_id: number | null;
  payment_method: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const paymentStatusColors = {
  pending: "bg-yellow-50 text-yellow-700",
  completed: "bg-green-50 text-green-700",
  failed: "bg-red-50 text-red-700",
  refunded: "bg-gray-50 text-gray-700",
};

export default function OrdersList() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setError("Você precisa estar autenticado para ver seus pedidos");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/my-orders");

        if (response.status === 401) {
          setError("Sessão expirada. Por favor, faça login novamente");
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao buscar pedidos");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-800">{error}</p>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-600 mb-4">Você ainda não tem pedidos</p>
        <a
          href="/loja"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Fazer um pedido agora
        </a>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition"
            onClick={() =>
              setExpandedOrder(expandedOrder === order.id ? null : order.id)
            }
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-lg">Pedido #{order.id}</h3>
                  <Badge
                    className={
                      statusColors[order.status as keyof typeof statusColors]
                    }
                  >
                    {order.status === "pending"
                      ? "Pendente"
                      : order.status === "processing"
                        ? "Processando"
                        : order.status === "completed"
                          ? "Concluído"
                          : "Cancelado"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  Data: {new Date(order.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="text-xl font-bold text-gray-900">
                  R$ {(order.total_amount / 100).toLocaleString("pt-BR")}
                </p>
                <Badge
                  className={
                    paymentStatusColors[
                      order.payment_status as keyof typeof paymentStatusColors
                    ]
                  }
                >
                  {order.payment_status === "pending"
                    ? "Pagamento Pendente"
                    : order.payment_status === "completed"
                      ? "Pago"
                      : order.payment_status === "failed"
                        ? "Falhou"
                        : "Reembolsado"}
                </Badge>
              </div>
            </div>
          </div>

          {expandedOrder === order.id && (
            <div className="border-t bg-gray-50 p-6">
              <h4 className="font-semibold mb-4">Itens do Pedido</h4>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Serviço</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                    <TableHead className="text-right">Preço Unit.</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.service_name}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        R$ {(item.unit_price / 100).toLocaleString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        R$ {(item.subtotal / 100).toLocaleString("pt-BR")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 flex flex-col items-end gap-3 pt-6 border-t">
                <div className="flex gap-4">
                  <span className="text-gray-600">Método de Pagamento:</span>
                  <span className="font-semibold capitalize">
                    {order.payment_method === "pix"
                      ? "PIX"
                      : order.payment_method === "credit_card"
                        ? "Cartão de Crédito"
                        : order.payment_method}
                  </span>
                </div>
                {order.coupon_id && (
                  <div className="flex gap-4">
                    <span className="text-gray-600">Cupom Aplicado:</span>
                    <span className="font-semibold">Sim</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
