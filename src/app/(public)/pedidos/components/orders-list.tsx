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
import {
  ChevronDown,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  CreditCard,
  Ticket,
  ShoppingCart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    bgLight: "bg-yellow-50",
    icon: Clock,
    label: "Pendente",
  },
  processing: {
    color: "bg-blue-100 text-blue-800",
    bgLight: "bg-blue-50",
    icon: Clock,
    label: "Processando",
  },
  completed: {
    color: "bg-green-100 text-green-800",
    bgLight: "bg-green-50",
    icon: CheckCircle,
    label: "Concluído",
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    bgLight: "bg-red-50",
    icon: XCircle,
    label: "Cancelado",
  },
};

const paymentStatusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    label: "Pagamento Pendente",
  },
  completed: {
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    label: "Pago",
  },
  failed: {
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
    label: "Falhou",
  },
  refunded: {
    color: "bg-gray-100 text-gray-800",
    icon: AlertCircle,
    label: "Reembolsado",
  },
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Skeleton className="h-20 w-full rounded-xl" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 border border-[#fc5735]/30 bg-[#fc5735]/5 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#fc5735] shrink-0 mt-0.5" />
            <p className="text-[#fc5735] font-medium">{error}</p>
          </div>
        </Card>
      </motion.div>
    );
  }

  if (orders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-12 md:p-16 text-center border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-center mb-6">
            <div className="p-5 bg-linear-to-br from-[#8338ec]/10 to-[#43bccd]/10 rounded-full">
              <ShoppingCart className="w-12 h-12 bg-linear-to-br from-[#8338ec] to-[#43bccd] bg-clip-text text-[#1a1a1a]" />
            </div>
          </div>
          <p className="text-gray-900 mb-2 text-xl font-bold">
            Você ainda não tem pedidos
          </p>
          <p className="text-gray-600 mb-8 text-base">
            Comece a fazer compras e acompanhe seus pedidos aqui
          </p>
          <a
            href="/loja"
            className="inline-block bg-linear-to-r from-[#8338ec] to-[#5a4fcf] text-white px-10 py-3.5 rounded-lg hover:shadow-xl transition-all duration-300 font-bold hover:scale-105 active:scale-95"
          >
            Ir para a Loja
          </a>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-gray-600 text-sm font-semibold uppercase mb-2">
            Total de Pedidos
          </p>
          <p className="text-3xl font-black text-gray-900">{orders.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-gray-600 text-sm font-semibold uppercase mb-2">
            Valor Total
          </p>
          <p className="text-3xl font-black bg-linear-to-r from-[#fc5735] to-[#8338ec] bg-clip-text text-transparent">
            R${" "}
            {(
              orders.reduce((sum, order) => sum + order.total_amount, 0) / 100
            ).toLocaleString("pt-BR")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <p className="text-gray-600 text-sm font-semibold uppercase mb-2">
            Pedidos Completados
          </p>
          <p className="text-3xl font-black text-green-600">
            {orders.filter((o) => o.status === "completed").length}
          </p>
        </motion.div>
      </div>

      <AnimatePresence>
        {orders.map((order) => {
          const statusConfig_ =
            statusConfig[order.status as keyof typeof statusConfig];
          const paymentConfig =
            paymentStatusConfig[
              order.payment_status as keyof typeof paymentStatusConfig
            ];
          const StatusIcon = statusConfig_?.icon || Clock;
          const PaymentIcon = paymentConfig?.icon || CreditCard;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden border border-gray-200 hover:border-[#8338ec]/40 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md">
                <div
                  className="p-6 md:p-8 cursor-pointer hover:bg-linear-to-r hover:from-[#8338ec]/2 hover:to-[#43bccd]/2 transition-all duration-200"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id,
                    )
                  }
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-linear-to-br from-[#8338ec]/15 to-[#43bccd]/15 rounded-lg">
                          <ShoppingCart className="w-5 h-5 bg-linear-to-br from-[#8338ec] to-[#43bccd] bg-clip-text text-transparent" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            Pedido #{order.id}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            {new Date(order.created_at).toLocaleDateString(
                              "pt-BR",
                              {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-14">
                        <Badge className={statusConfig_?.color}>
                          <StatusIcon className="w-3 h-3 mr-1.5" />
                          {statusConfig_?.label}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-4">
                      <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-2">
                          Total
                        </p>
                        <p className="text-3xl md:text-4xl font-black bg-linear-to-r from-[#fc5735] via-[#8338ec] to-[#43bccd] bg-clip-text text-transparent">
                          R${" "}
                          {(order.total_amount / 100).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      <Badge className={paymentConfig?.color}>
                        <PaymentIcon className="w-3 h-3 mr-1.5" />
                        {paymentConfig?.label}
                      </Badge>
                    </div>

                    <motion.div
                      animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="shrink-0 text-gray-400"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-linear-to-b from-gray-50/50 to-white"
                    >
                      <div className="p-6 md:p-8">
                        <h4 className="font-bold mb-6 flex items-center gap-3 text-gray-900 text-lg">
                          <div className="p-2 bg-linear-to-br from-[#8338ec]/15 to-[#43bccd]/15 rounded-lg">
                            <ShoppingCart className="w-4 h-4 bg-linear-to-br from-[#8338ec] to-[#43bccd] bg-clip-text text-transparent" />
                          </div>
                          Itens do Pedido
                        </h4>

                        <div className="space-y-3 mb-6">
                          {order.items.map((item, idx) => (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#8338ec]/40 hover:shadow-sm transition-all duration-200"
                            >
                              <div className="flex-1">
                                <p className="font-semibold text-gray-900">
                                  {item.service_name}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.quantity} unidade
                                  {item.quantity > 1 ? "s" : ""}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600 mb-1">
                                  R${" "}
                                  {(item.unit_price / 100).toLocaleString(
                                    "pt-BR",
                                  )}
                                </p>
                                <p className="font-bold text-gray-900">
                                  R${" "}
                                  {(item.subtotal / 100).toLocaleString(
                                    "pt-BR",
                                  )}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 pt-6 space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg">
                            <span className="text-gray-600 flex items-center gap-2 font-medium">
                              <CreditCard className="w-4 h-4 text-[#8338ec]" />
                              Método de Pagamento:
                            </span>
                            <span className="font-bold text-gray-900 capitalize">
                              {order.payment_method === "pix"
                                ? "PIX"
                                : order.payment_method === "credit_card"
                                  ? "Cartão de Crédito"
                                  : order.payment_method}
                            </span>
                          </div>
                          {order.coupon_id && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center justify-between p-4 bg-linear-to-r from-[#43bccd]/10 to-[#43bccd]/5 rounded-lg border border-[#43bccd]/30"
                            >
                              <span className="text-[#43bccd] flex items-center gap-2 font-bold">
                                <Ticket className="w-4 h-4" />
                                Cupom Aplicado
                              </span>
                              <span className="font-bold text-[#43bccd] bg-[#43bccd]/10 px-3 py-1 rounded-full text-sm">
                                ID: {order.coupon_id}
                              </span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
