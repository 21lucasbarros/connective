"use client";

import { Suspense } from "react";
import Link from "next/link";
import { QrCode, Copy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function CheckoutPixContent() {
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  const paymentId = searchParams.get("payment_id");
  const qrCodeBase64 = searchParams.get("qr_code_base64");
  const copyPasteCode = searchParams.get("copy_paste");

  const handleCopyCode = async () => {
    if (!copyPasteCode) return;

    try {
      await navigator.clipboard.writeText(copyPasteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  // Debug logs
  console.log("CheckoutPix params:", {
    paymentId,
    qrCodeBase64: qrCodeBase64 ? "✓ recebido" : "❌ não recebido",
    copyPasteCode,
  });

  // Se não houver QR Code nem copy-paste, mostra mensagem de erro
  if (!qrCodeBase64 && !copyPasteCode) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Erro ao processar Pix
          </h1>
          <p className="text-gray-600 mb-6">
            Não foi possível gerar o QR Code. Por favor, tente novamente.
          </p>
          <Link href="/checkout">
            <Button className="bg-[#8338ec] hover:bg-[#6d28d9]">
              Voltar ao carrinho
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Link
        href="/checkout"
        className="inline-flex items-center text-[#8338ec] hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar
      </Link>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
          <QrCode className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-[#8338ec] mb-2">
          Pagamento via Pix
        </h1>
        <p className="text-gray-600">
          Abra seu app bancário e escaneie o QR Code ou use o código copia e
          cola
        </p>
      </div>

      <div className="space-y-6">
        {/* QR Code Section */}
        {qrCodeBase64 && (
          <Card>
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <p className="text-sm font-semibold text-gray-700 mb-4">
                  Escaneie com seu app bancário:
                </p>
                <div className="inline-block p-4 bg-gray-50 rounded-lg border-2 border-gray-200">
                  <img
                    src={`data:image/png;base64,${qrCodeBase64}`}
                    alt="QR Code Pix"
                    className="w-64 h-64"
                    onError={(e) => {
                      console.error("Erro ao carregar QR Code");
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Copy and Paste Section */}
        {copyPasteCode && (
          <Card>
            <CardContent className="p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Ou copie este código:
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg border border-gray-200 font-mono text-xs break-all">
                      {copyPasteCode}
                    </div>
                    <button
                      onClick={handleCopyCode}
                      className={`px-6 py-2 rounded-lg transition flex items-center gap-2 whitespace-nowrap font-semibold ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-[#8338ec] text-white hover:bg-[#6d28d9]"
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? "Copiado!" : "Copiar"}
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Alert className="border-blue-200 bg-blue-50">
          <AlertDescription className="text-blue-800 space-y-2">
            <p className="font-semibold">Próximos passos:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Abra o seu app bancário</li>
              <li>Procure pela opção de fazer um Pix</li>
              <li>
                {qrCodeBase64 && copyPasteCode
                  ? "Escaneie o QR Code ou cole o código"
                  : "Insira o código"}
              </li>
              <li>Confirme a transação</li>
              <li>
                Você será redirecionado para a página de confirmação
                automaticamente
              </li>
            </ol>
          </AlertDescription>
        </Alert>

        {paymentId && (
          <div className="text-center text-sm text-gray-600">
            <p>
              ID do pagamento: <span className="font-mono">{paymentId}</span>
            </p>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center pt-6">
          <Link href="/">
            <Button variant="outline">Voltar à loja</Button>
          </Link>
          <Link href="/checkout">
            <Button className="bg-[#8338ec] hover:bg-[#6d28d9]">
              Voltar ao carrinho
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPix() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
          <p className="text-gray-600">Carregando dados do pagamento...</p>
        </div>
      }
    >
      <CheckoutPixContent />
    </Suspense>
  );
}
