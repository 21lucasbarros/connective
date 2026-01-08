    // id, nome , senha, quanto foi criado e atualizado

import { PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Kysely } from "kysely";


    interface Database {
        user: UserTable;
    }

    interface UserTable {
        id: number;
        nome: string;
        senha: string;
        created_at: Date;
        updated_at: Date;
    }
    export type { Database, UserTable };


const dialect = new PostgresDialect({
  pool: new Pool({
   connectionString: process.env.connectionString,
  }) })

export const db = new Kysely<Database>({
  dialect,
}) 