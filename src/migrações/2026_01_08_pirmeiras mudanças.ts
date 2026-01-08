import { Kysely } from "kysely"; 

export async function up(db: Kysely<any>): Promise<void>{
   await db.schema.createTable("user")
    .addColumn("id", "numeric", (col) => col.primaryKey())
    .addColumn("nome", "varchar", (col) => col.notNull())
    .addColumn("senha", "varchar", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) => col.notNull())
    .addColumn("updated_at", "timestamp", (col) => col.notNull())
.execute()
}

export async function down(db: Kysely<any>): Promise<void>{
    await db.schema.dropTable("user").execute()
}