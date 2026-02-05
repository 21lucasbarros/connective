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
     * santi desculpa por mexer no seu código, mas eu estava sem sono xd
     *
     * a partir daqui eu tentei deixar o fluxo mais esperto:
     *
     * como a resposta do sdk do mercado pago às vezes muda,
     * eu tentei pegar o id do pagamento de vários lugares possíveis
     * (direto, dentro de response, dentro de body, etc)
     * se não achar em nenhum, fica null mesmo
     */
    const maybeId =
      (paymentCreate as any)?.id ||
      (paymentCreate as any)?.response?.id ||
      (paymentCreate as any)?.body?.id ||
      null;

    /**
     * aqui eu pensei assim,
     * se o front mandar uma redirect_url, a gente respeita ela
     * se não mandar, eu crio uma rota padrão de sucesso
     * e, se tiver id do pagamento, já mando ele como query
     */
    const redirectUrlFromBody =
      typeof body.redirect_url === "string" ? body.redirect_url : null;

    const defaultSuccess = maybeId
      ? `/checkout/success?payment_id=${encodeURIComponent(String(maybeId))}`
      : "/checkout/success";

    const finalRedirect = redirectUrlFromBody || defaultSuccess;

    /**
     * aqui é o pulo do gato,
     * se a requisição vier direto do browser (form, navegação normal),
     * eu faço um redirect no servidor
     *
     * se vier de fetch/axios/etc, eu só devolvo json
     * e deixo o front decidir o que fazer
     */
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/html")) {
      return new Response(null, {
        status: 303,
        headers: { Location: finalRedirect },
      });
    }

    /**
     * caso padrão,
     * devolvo o pagamento criado e a url sugerida
     * aí o front pode redirecionar quando quiser
     */
    return Response.json({ paymentCreate, redirect_to: finalRedirect });
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
