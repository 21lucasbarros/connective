import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccess({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const orderId =
    typeof searchParams?.order_id === "string"
      ? searchParams?.order_id
      : typeof searchParams?.payment_id === "string"
        ? searchParams?.payment_id
        : null;

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-green-600" />
      </div>

      <h1 className="text-3xl font-bold text-[#8338ec] mb-2">
        Pagamento concluído
      </h1>
      <p className="text-gray-600 mb-6">
        Obrigado! Seu pagamento foi processado com sucesso.
      </p>

      {orderId && (
        <p className="text-sm text-gray-700 mb-6">
          ID do pagamento: <span className="font-mono">{orderId}</span>
        </p>
      )}

      <div className="flex items-center justify-center gap-4">
        <Link href="/">
          <Button>Ir para a loja</Button>
        </Link>

        <Link href="/">
          <Button variant="outline">Ver meus pedidos</Button>
        </Link>
      </div>
    </div>
  );
}
