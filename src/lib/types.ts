export type Coupon = {
  id: number;
  code: string;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: number;
  minimum_purchase_value: number | null;
  start_date: string;
  end_date: string | null;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CouponInput = Omit<
  Coupon,
  "id" | "used_count" | "created_at" | "updated_at"
>;

export type AdminUser = {
  id: number;
  name: string;
  email: string;
  role?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type Service = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};
