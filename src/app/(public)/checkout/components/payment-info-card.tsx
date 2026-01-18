"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Payment } from "@mercadopago/sdk-react";
import { ComponentProps } from "react";
import { promises } from "dns";

type Props = {
  total: number;
};

export default function PaymentInfoCard({ total }: Props) {
  const initialization: ComponentProps<typeof Payment>["initialization"] = {
    amount: total,
  };

  const customization: ComponentProps<typeof Payment>["customization"] = {
    paymentMethods: {
      atm: "all",
      ticket: "all",
      bankTransfer: ["pix"],
      creditCard: "all",
      prepaidCard: "all",
      mercadoPago: "all",
      maxInstallments: 2,
    },
    visual: {
      hidePaymentButton: true,
    },
  };

  const onError: ComponentProps<typeof Payment>["onError"] = async (error) => {
    console.log(error);
  };

  const onReady = async () => {};
  return (
    <Card>
      <Payment
        initialization={initialization}
        customization={customization}
        onBinChange={console.log}
        onSubmit={async (PaymantFormData, IAdditionalCardFormData) => {
          console.log("on submit", PaymantFormData, IAdditionalCardFormData);
        }}
        onReady={async () => {
          console.log("Done");
        }}
        onError={async (IBrickError) => {
          console.log(IBrickError);
        }}
      />
    </Card>
  );
}
