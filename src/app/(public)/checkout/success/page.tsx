import Link from "next/link";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  const paymentId =
    typeof params?.payment_id === "string"
      ? params?.payment_id
      : typeof params?.order_id === "string"
        ? params?.order_id
        : null;

  const status =
    typeof params?.status === "string" ? params.status : "approved";

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      {status === "approved" ? (
        <>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-[#8338ec] mb-2">
            Pagamento concluído
          </h1>
          <p className="text-gray-600 mb-6">
            Obrigado! Seu pagamento foi processado com sucesso.
          </p>
        </>
      ) : status === "pending" ? (
        <>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mx-auto mb-6">
            <Clock className="w-10 h-10 text-yellow-600" />
          </div>

          <h1 className="text-3xl font-bold text-yellow-600 mb-2">
            Pagamento Pendente
          </h1>
          <p className="text-gray-600 mb-6">
            Seu pagamento está sendo processado. Você receberá uma confirmação
            em breve.
          </p>
        </>
      ) : (
        <>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Pagamento Recusado
          </h1>
          <p className="text-gray-600 mb-6">
            Infelizmente seu pagamento não pôde ser processado. Por favor, tente
            novamente.
          </p>
        </>
      )}

      {paymentId && (
        <p className="text-sm text-gray-700 mb-6">
          ID do pagamento: <span className="font-mono">{paymentId}</span>
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
