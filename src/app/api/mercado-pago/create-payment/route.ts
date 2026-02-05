import { payment } from "@/lib/mercado-pago";
import { Payment } from "mercadopago";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const paymentCreate = await payment.create({
      body: {
        payment_method: { type: body.paymentType },
        transaction_amount: body.formData.transaction_amount,
        token: body.formData.token,
        installments: body.formData.installments,
        payment_method_id: body.formData.payment_method_id,
        issuer_id: body.formData.issuer_id,
        payer: body.formData.payer,
      },
    });

    /**
     * Detecção do método de pagamento
     * Se for PIX, precisa extrair QR Code e copy-paste code
     */
    const paymentMethodId =
      body.formData?.payment_method_id || body.paymentMethodId || null;
    const selectedPaymentMethod =
      body.selectedPaymentMethod || body.formData?.payment_method_id || null;
    const isPixPayment =
      paymentMethodId === "pix" || selectedPaymentMethod === "pix";

    console.log("=== PAYMENT METHOD DEBUG ===");
    console.log("paymentMethodId:", paymentMethodId);
    console.log("selectedPaymentMethod:", selectedPaymentMethod);
    console.log("isPixPayment:", isPixPayment);

    /**
     * Validação do status do pagamento
     * Verifica se o pagamento foi aprovado corretamente
     * Status válido para aprovação: status = "approved" E status_detail = "accredited"
     */
    const paymentStatus = (paymentCreate as any)?.status || null;
    const paymentStatusDetail = (paymentCreate as any)?.status_detail || null;

    const isApproved =
      paymentStatus === "approved" && paymentStatusDetail === "accredited";

    /**
     * Extração do ID do pagamento de múltiplas fontes possíveis
     */
    const maybeId =
      (paymentCreate as any)?.id ||
      (paymentCreate as any)?.response?.id ||
      (paymentCreate as any)?.body?.id ||
      null;

    /**
     * Extração de dados PIX da resposta
     * O Mercado Pago retorna em point_of_interaction ou em outras localizações
     * Log completo para debug
     */
    let pixQrCodeBase64 = null;
    let pixQrCodeText = null;
    let pixCopyPaste = null;

    if (isPixPayment && paymentStatus === "pending") {
      console.log("=== EXTRACTING PIX DATA ===");

      const pointOfInteraction = (paymentCreate as any)?.point_of_interaction;

      if (pointOfInteraction?.transaction_data) {
        // Extrai a imagem base64 do QR Code
        pixQrCodeBase64 =
          pointOfInteraction.transaction_data.qr_code_base64 || null;

        // Extrai o código texto (copia e cola)
        pixQrCodeText = pointOfInteraction.transaction_data.qr_code || null;

        // Extrai o código copia e cola
        pixCopyPaste =
          pointOfInteraction.transaction_data.copy_paste ||
          pointOfInteraction.transaction_data.qr_code ||
          null;

        console.log(
          "✓ QR Code Base64 encontrado:",
          pixQrCodeBase64 ? "sim" : "não",
        );
        console.log(
          "✓ Código PIX (texto) encontrado:",
          pixQrCodeText ? "sim" : "não",
        );
        console.log(
          "✓ Código Copia e Cola encontrado:",
          pixCopyPaste ? "sim" : "não",
        );
      } else {
        console.warn(
          "⚠ transaction_data não encontrado em point_of_interaction",
        );
      }
    }

    /**
     * Construção da URL de redirecionamento
     * Se for PIX com dados, redireciona para página de Pix
     * Caso contrário, usa o fluxo padrão
     */
    const redirectUrlFromBody =
      typeof body.redirect_url === "string" ? body.redirect_url : null;

    let finalRedirect: string;

    if (isPixPayment && paymentStatus === "pending") {
      // Fluxo PIX: verifica se tem dados do QR Code
      if (pixQrCodeBase64) {
        // Redireciona para página intermediária de Pix
        const queryParams = new URLSearchParams({
          payment_id: String(maybeId || ""),
          qr_code_base64: pixQrCodeBase64,
          ...(pixCopyPaste && { copy_paste: pixCopyPaste }),
        });
        finalRedirect = `/checkout/pix?${queryParams.toString()}`;
        console.log("✓ Redirecionando para página PIX com QR Code Base64");
      } else {
        // Se não tem QR Code, avisa no console mas ainda redireciona
        console.warn(
          "⚠ PIX selecionado mas QR Code Base64 não encontrado. Redirecionando para sucesso pendente.",
        );
        const statusParam = "pending";
        finalRedirect = maybeId
          ? `/checkout/success?payment_id=${encodeURIComponent(String(maybeId))}&status=${statusParam}`
          : `/checkout/success?status=${statusParam}`;
      }
    } else {
      // Fluxo padrão (cartão, outros)
      const statusParam = isApproved
        ? "approved"
        : paymentStatus === "pending"
          ? "pending"
          : "rejected";

      const defaultSuccess = maybeId
        ? `/checkout/success?payment_id=${encodeURIComponent(String(maybeId))}&status=${statusParam}`
        : `/checkout/success?status=${statusParam}`;

      finalRedirect = redirectUrlFromBody || defaultSuccess;
    }

    /**
     * diferencia entre requisicoes do navegador e fetch
     * navegador: faz redirect HTTP 303
     * fetch/API: retorna JSON
     */
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return new Response(null, {
        status: 303,
        headers: { Location: finalRedirect },
      });
    }

    /**
     * retorno da API para cliente fetch
     * inclui informacoes do pagamento e URL de redirecionamento
     */
    return Response.json({
      paymentCreate,
      status: paymentStatus,
      status_detail: paymentStatusDetail,
      isApproved,
      isPixPayment,
      pixQrCodeBase64,
      pixCopyPaste,
      redirect_to: finalRedirect,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}

// console.log(paymentCreate);
// return Response.json({
//   payment: {
//     id: paymentCreate.id,
//     status: paymentCreate.status,
//     qr_code: paymentCreate.point_of_interaction,
//   },
// });
