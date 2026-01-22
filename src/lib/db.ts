import {
  PostgresDialect,
  Kysely,
  Generated,
  ColumnType,
  Selectable,
} from "kysely";
import { Pool } from "pg";

export interface ServiceTable {
  id: Generated<number>;
  name: string;
  price: number;
  description: string | null;
  is_custom: boolean;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}
export type User = Selectable<UserTable>;
export interface UserTable {
  id: Generated<number>;
  name: string;
  password: string;
  cpf?: string | null;
  phone?: string | null;
  email: string;
  role?: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface CouponsTable {
  id: Generated<number>;
  code: string;
  discount_type: "PERCENTAGE" | "FIXED";
  discount_value: number;
  minimum_purchase_value: number | null;
  start_date: Date;
  end_date: Date | null;
  max_uses: number | null;
  used_count: number;
  is_active: boolean;
  created_at: ColumnType<Date, Date | undefined, never>;
  updated_at: ColumnType<Date, Date | undefined, never>;
}

export interface Database {
  services: ServiceTable;
  user: UserTable;
  coupons: CouponsTable;
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
