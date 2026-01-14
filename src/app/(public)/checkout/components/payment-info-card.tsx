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

export default function PaymentInfoCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Informações de Pagamento
        </CardTitle>
        <CardDescription>
          Seus dados estão seguros e criptografados
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Número do Cartão</Label>
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardName">Nome no Cartão</Label>
          <Input id="cardName" placeholder="Nome impresso no cartão" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiry">Validade</Label>
            <Input id="expiry" placeholder="MM/AA" maxLength={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" placeholder="000" maxLength={4} type="password" />
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Lock className="w-4 h-4 text-green-600" />
          <p className="text-sm text-gray-600">
            Pagamento 100% seguro e criptografado
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
