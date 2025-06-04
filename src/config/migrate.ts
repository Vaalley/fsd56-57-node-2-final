import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator"; // migrate est une fct de drizzle qui permet de migrer la db
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { env } from "./env";

const { DATABASE_URL } = env;

async function main() {
  const pool = new Pool({ connectionString: DATABASE_URL });

  const db: NodePgDatabase = drizzle(pool);

  console.log("Migrating database...");

  await migrate(db, { migrationsFolder: "src/migrations" });

  console.log("Database migrated successfully !");

  await pool.end();
}

main();
