import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("coupons")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("code", "varchar", (col) => col.notNull().unique())
    .addColumn("discount_type", "varchar", (col) => col.notNull())
    .addColumn("discount_value", "numeric", (col) => col.notNull())
    .addColumn("minimum_purchase_value", "numeric")
    .addColumn("start_date", "timestamp", (col) => col.notNull())
    .addColumn("end_date", "timestamp")
    .addColumn("max_uses", "integer")
    .addColumn("used_count", "integer", (col) => col.notNull().defaultTo(0))
    .addColumn("is_active", "boolean", (col) => col.notNull().defaultTo(true))
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("coupons").execute();
}
