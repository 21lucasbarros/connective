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
import { CardPayment } from "@mercadopago/sdk-react";
import { ComponentProps } from "react";

export default async function PaymentInfoCard() {
  initMercadoPago("YOUR_PUBLIC_KEY");
  const initialization = {
    amount: 100,
  };

  const onSubmit: ComponentProps<typeof CardPayment>["onSubmit"] = async (
    formData
  ) => {
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  };

  const onError = async (error) => {
    console.log(error);
  };

  const onReady = async () => {};
  return (
    <Card>
      <CardPayment
        initialization={initialization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </Card>
  );
}
