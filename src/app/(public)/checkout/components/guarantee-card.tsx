"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default function GuaranteeCard() {
  return (
    <Card className="mt-4 border-green-200 bg-green-50">
      <CardContent className="pt-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-2">
            <Lock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-green-900">Garantia de 7 dias</h3>
          <p className="text-xs text-green-700">
            Se não gostar, devolvemos 100% do seu dinheiro
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
