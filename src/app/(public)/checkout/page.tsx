"use client";

import { useEffect, useMemo, useState } from "react";
import type { Coupon } from "@/lib/types";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import PersonalInfoCard from "./components/personal-info-card";
import PaymentInfoCard from "./components/payment-info-card";
import OrderSummaryCard from "./components/order-summary-card";
import GuaranteeCard from "./components/guarantee-card";

export default function Checkout() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);

  const { cart } = useCart();
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    if (user) {
      const parts = (user.name || "").split(" ");
      setFirstName(parts.slice(0, -1).join(" ") || parts[0] || "");
      setLastName(parts.length > 1 ? parts[parts.length - 1] : "");
      if (user.email) setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/coupons")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) setAvailableCoupons(data);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);
  }, [cart]);

  const discount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const type = appliedCoupon.discount_type;
    const value = Number(appliedCoupon.discount_value || 0);
    if (type === "PERCENTAGE") return (subtotal * value) / 100;
    return value;
  }, [appliedCoupon, subtotal]);

  const total = subtotal - discount;

  const handleApplyCoupon = async () => {
    setCouponError(null);
    const code = couponCode.trim();
    if (!code) return setCouponError("Digite um código de cupom");

    const found = availableCoupons.find(
      (c: Coupon) => String(c.code).toLowerCase() === String(code).toLowerCase()
    );
    if (!found) return setCouponError("Cupom não encontrado");

    if (!found.is_active) return setCouponError("Cupom inativo");

    const now = new Date();
    if (found.start_date && new Date(found.start_date) > now)
      return setCouponError("Cupom ainda não está disponível");
    if (found.end_date && new Date(found.end_date) < now)
      return setCouponError("Cupom expirado");

    const min = Number(found.minimum_purchase_value ?? 0);
    if (min > 0 && subtotal < min)
      return setCouponError(
        `Valor mínimo para usar esse cupom é R$ ${min.toFixed(2)}`
      );

    if (found.max_uses && typeof found.used_count === "number") {
      if (found.used_count >= found.max_uses)
        return setCouponError("Cupom já alcançou o número máximo de usos");
    }

    setAppliedCoupon(found);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-[#8338ec]">
          Finalizar Compra
        </h1>
        <p className="text-gray-600">
          Revise seu pedido e complete suas informações para concluir a compra
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalInfoCard
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            cpf={cpf}
            setCpf={setCpf}
          />

          <PaymentInfoCard />
        </div>

        <div className="lg:col-span-1">
          <OrderSummaryCard
            cart={cart}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            appliedCoupon={appliedCoupon}
            couponError={couponError}
            handleApplyCoupon={handleApplyCoupon}
            subtotal={subtotal}
            discount={discount}
            total={total}
          />

          <GuaranteeCard />
        </div>
      </div>
    </div>
  );
}
