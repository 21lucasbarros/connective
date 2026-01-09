import { defineConfig } from "kysely-ctl";
import { db } from "./src/lib/db";
export default defineConfig({
  kysely: db,
  migrations: { migrationFolder: "./src/migrations" },
});
