import { payment } from "@/lib/mercado-pago";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    0;
    const paymentCreate = await payment.create({
      body: {
        payment_method: { type: body.paymentType },
        transaction_amount: body.formData.transaction_amount,
        token: body.formData.token,
        installments: body.formData.installments,
        payment_method_id: body.formData.payment_method_id,
        issuer_id: body.formData.issuer_id,
        payer: {
          email: body.formData.payer.email,
          identification: {
            number: body.formData.payer.identification.number,
            type: body.formData.payer.identification.type,
          },
        },
      },
    });
    return Response.json({
      paymentCreate: paymentCreate,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
