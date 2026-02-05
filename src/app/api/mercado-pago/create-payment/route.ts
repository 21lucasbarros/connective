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
     * validacao do status do pagamento
     * verifica se o pagamento foi aprovado corretamente
     * status valido para aprovacao: status = "approved" E status_detail = "accredited"
     */
    const paymentStatus = (paymentCreate as any)?.status || null;
    const paymentStatusDetail = (paymentCreate as any)?.status_detail || null;

    const isApproved =
      paymentStatus === "approved" && paymentStatusDetail === "accredited";

    /**
     * extrai do ID do pagamento de multiplas fontes possiveis
     */
    const maybeId =
      (paymentCreate as any)?.id ||
      (paymentCreate as any)?.response?.id ||
      (paymentCreate as any)?.body?.id ||
      null;

    /**
     * construcao da URL de redirecionamento
     * inclui o status do pagamento como parametro
     * prioriza sempre redirect_url do corpo da requisicao se existir
     */
    const redirectUrlFromBody =
      typeof body.redirect_url === "string" ? body.redirect_url : null;

    const statusParam = isApproved
      ? "approved"
      : paymentStatus === "pending"
        ? "pending"
        : "rejected";

    const defaultSuccess = maybeId
      ? `/checkout/success?payment_id=${encodeURIComponent(String(maybeId))}&status=${statusParam}`
      : `/checkout/success?status=${statusParam}`;

    const finalRedirect = redirectUrlFromBody || defaultSuccess;

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
