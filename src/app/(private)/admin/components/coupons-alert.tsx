import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

interface ShortCoupon {
  id: number;
  code: string;
  end_date?: string | null;
}

interface CouponsAlertProps {
  coupons: ShortCoupon[];
}

export default function CouponsAlert({ coupons }: CouponsAlertProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const couponsWithDate = coupons.filter((c) => c.end_date);

  const expiredCoupons = couponsWithDate.filter((c) => {
    const expirationDate = new Date(c.end_date as string);
    expirationDate.setHours(0, 0, 0, 0);
    return expirationDate < today;
  });

  const expiringSoonCoupons = couponsWithDate.filter((c) => {
    const expirationDate = new Date(c.end_date as string);
    expirationDate.setHours(0, 0, 0, 0);
    const daysUntilExpiration = Math.floor(
      (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiration >= 0 && daysUntilExpiration <= 30;
  });

  const allGoodCoupons = couponsWithDate.filter((c) => {
    const expirationDate = new Date(c.end_date as string);
    expirationDate.setHours(0, 0, 0, 0);
    const daysUntilExpiration = Math.floor(
      (expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiration > 30;
  });

  if (!coupons || coupons.length === 0) return null;

  return (
    <div className="space-y-3">
      {expiredCoupons.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900">
              {expiredCoupons.length === 1
                ? "1 cupom vencido"
                : `${expiredCoupons.length} cupons vencidos`}
            </h3>
            <ul className="mt-2 space-y-1">
              {expiredCoupons.map((c) => (
                <li key={c.id} className="text-sm text-red-700">
                  • {c.code} - Venceu em{" "}
                  {new Date(c.end_date as string).toLocaleDateString("pt-BR")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {expiringSoonCoupons.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Clock className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900">
              {expiringSoonCoupons.length === 1
                ? "1 cupom vence em breve"
                : `${expiringSoonCoupons.length} cupons vencem em breve`}
            </h3>
            <ul className="mt-2 space-y-1">
              {expiringSoonCoupons.map((c) => {
                const daysLeft = Math.floor(
                  (new Date(c.end_date as string).getTime() - today.getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                return (
                  <li key={c.id} className="text-sm text-amber-700">
                    • {c.code} - Faltam {daysLeft}{" "}
                    {daysLeft === 1 ? "dia" : "dias"} para vencer (
                    {new Date(c.end_date as string).toLocaleDateString("pt-BR")}
                    )
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {expiredCoupons.length === 0 &&
        expiringSoonCoupons.length === 0 &&
        allGoodCoupons.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-emerald-900">
                Todos os cupons com data estão em dia!
              </h3>
              <p className="text-sm text-emerald-700 mt-1">
                {allGoodCoupons.length}{" "}
                {allGoodCoupons.length === 1 ? "cupom" : "cupons"} com mais de
                30 dias para vencer.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
