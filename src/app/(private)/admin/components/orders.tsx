"use client";

import { useState, useEffect } from "react";
import type { Order } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

interface OrderWithDetails extends Order {
  items: Array<{
    id: number;
    order_id: number;
    service_id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;
    created_at: string;
    service_name?: string;
  }>;
  name?: string;
  email?: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(
    null,
  );
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data ?? []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusColor(
    status: string,
  ): "default" | "destructive" | "outline" | "secondary" {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "secondary";
      case "pending":
        return "outline";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  }

  function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: "Pendente",
      processing: "Processando",
      completed: "Completo",
      cancelled: "Cancelado",
    };
    return labels[status] || status;
  }

  function getPaymentStatusColor(
    status: string,
  ): "default" | "destructive" | "outline" | "secondary" {
    switch (status) {
      case "completed":
        return "default";
      case "pending":
        return "outline";
      case "failed":
        return "destructive";
      case "refunded":
        return "secondary";
      default:
        return "outline";
    }
  }

  function getPaymentStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending: "Pendente",
      completed: "Completo",
      failed: "Falhou",
      refunded: "Reembolsado",
    };
    return labels[status] || status;
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatCurrency(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  if (loading) {
    return <div className="text-center py-8">Carregando pedidos...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#222]">Pedidos</h2>
        <p className="text-[#888] mt-1">
          Total de {orders.length} pedido{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardContent className="p-0">
          {orders.length === 0 ? (
            <div className="p-6 text-center text-[#888]">
              Nenhum pedido encontrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#eee]">
                    <TableHead className="text-[#222]">ID</TableHead>
                    <TableHead className="text-[#222]">Cliente</TableHead>
                    <TableHead className="text-[#222]">Email</TableHead>
                    <TableHead className="text-[#222]">Status</TableHead>
                    <TableHead className="text-[#222]">Pagamento</TableHead>
                    <TableHead className="text-[#222]">Total</TableHead>
                    <TableHead className="text-[#222]">Data</TableHead>
                    <TableHead className="text-[#222] text-right">
                      Ação
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-b border-[#eee] hover:bg-[#f6fcfd]"
                    >
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>{order.name || "Desconhecido"}</TableCell>
                      <TableCell className="text-sm text-[#888]">
                        {order.email || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(order.status)}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getPaymentStatusColor(order.payment_status)}
                        >
                          {getPaymentStatusLabel(order.payment_status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {formatCurrency(Number(order.total_amount))}
                      </TableCell>
                      <TableCell className="text-sm text-[#888]">
                        {formatDate(String(order.created_at))}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetails(true);
                          }}
                          className="hover:bg-[#f6fcfd]"
                        >
                          <Eye className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={showDetails} onOpenChange={setShowDetails}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogTitle>Detalhes do Pedido</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 py-4">
              {selectedOrder && (
                <>
                  <div>
                    <h4 className="font-semibold text-[#222] mb-2">
                      Informações Gerais
                    </h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-[#888]">ID:</span> #
                        {selectedOrder.id}
                      </p>
                      <p>
                        <span className="text-[#888]">Cliente:</span>{" "}
                        {selectedOrder.name}
                      </p>
                      <p>
                        <span className="text-[#888]">Email:</span>{" "}
                        {selectedOrder.email}
                      </p>
                      <p>
                        <span className="text-[#888]">Data:</span>{" "}
                        {formatDate(String(selectedOrder.created_at))}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#222] mb-2">Status</h4>
                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="text-[#888]">Pedido:</span>{" "}
                        <Badge variant={getStatusColor(selectedOrder.status)}>
                          {getStatusLabel(selectedOrder.status)}
                        </Badge>
                      </p>
                      <p>
                        <span className="text-[#888]">Pagamento:</span>{" "}
                        <Badge
                          variant={getPaymentStatusColor(
                            selectedOrder.payment_status,
                          )}
                        >
                          {getPaymentStatusLabel(selectedOrder.payment_status)}
                        </Badge>
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#222] mb-2">Itens</h4>
                    <div className="space-y-2 text-sm">
                      {selectedOrder.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between p-2 bg-[#f6fcfd] rounded"
                        >
                          <div>
                            <p className="font-medium">
                              {item.service_name ||
                                `Serviço #${item.service_id}`}
                            </p>
                            <p className="text-[#888]">
                              Qtd: {item.quantity} ×{" "}
                              {formatCurrency(item.unit_price)}
                            </p>
                          </div>
                          <p className="font-semibold text-right">
                            {formatCurrency(item.subtotal)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#eee]">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-[#43bccd]">
                        {formatCurrency(Number(selectedOrder.total_amount))}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </AlertDialogDescription>
          <AlertDialogCancel>Fechar</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
