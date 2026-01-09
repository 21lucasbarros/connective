import { PostgresDialect, Kysely, Generated, ColumnType } from "kysely";
import { Pool } from "pg";

export interface ServiceTable {
  id: Generated<number>;
  name: string;
  price: number;
  description: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface UserTable {
  id: Generated<number>;
  name: string;
  password: string;
  email: string;
  role?: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Database {
  services: ServiceTable;
  user: UserTable;
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
