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
    console.log(paymentCreate);
    return Response.json({
      payment: {
        id: paymentCreate.id,
        status: paymentCreate.status,
        qr_code: paymentCreate.point_of_interaction,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
