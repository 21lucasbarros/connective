import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("orders")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("user_id", "integer", (col) =>
      col.notNull().references("user.id").onDelete("cascade"),
    )
    .addColumn("status", "varchar", (col) => col.notNull().defaultTo("pending"))
    .addColumn("total_amount", "decimal", (col) => col.notNull())
    .addColumn("coupon_id", "integer", (col) => col.references("coupons.id"))
    .addColumn("payment_method", "varchar", (col) => col.notNull())
    .addColumn("payment_status", "varchar", (col) =>
      col.notNull().defaultTo("pending"),
    )
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .addColumn("updated_at", "timestamp", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .execute();

  await db.schema
    .createTable("order_items")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("order_id", "integer", (col) =>
      col.notNull().references("orders.id").onDelete("cascade"),
    )
    .addColumn("service_id", "integer", (col) =>
      col.notNull().references("services.id").onDelete("restrict"),
    )
    .addColumn("quantity", "integer", (col) => col.notNull().defaultTo(1))
    .addColumn("unit_price", "decimal", (col) => col.notNull())
    .addColumn("subtotal", "decimal", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.notNull().defaultTo(db.fn("now")),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("order_items").ifExists().execute();
  await db.schema.dropTable("orders").ifExists().execute();
}
