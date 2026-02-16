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

type BaseUser = {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  cpf?: string | null;
  role?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type User = BaseUser;

export type AdminUser = BaseUser & { role: string };

export type Service = {
  id: number;
  name: string;
  price: number;
  description?: string | null;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type OrderItem = {
  id: number;
  order_id: number;
  service_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  created_at: string;
  service?: Service;
};

export type Order = {
  id: number;
  user_id: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  total_amount: number;
  coupon_id?: number | null;
  payment_method: string;
  payment_status: "pending" | "completed" | "failed" | "refunded";
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
  user?: User;
  coupon?: Coupon;
};

export type OrderWithDetails = Order & {
  items: OrderItem[];
  user: User;
  coupon?: Coupon;
};
