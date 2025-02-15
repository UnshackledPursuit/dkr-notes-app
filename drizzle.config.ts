import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default {
  schema: "./db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: process.env.DATABASE_URL?.split('@')[1]?.split(':')[0] ?? '',
    user: process.env.DATABASE_URL?.split('://')[1]?.split(':')[0] ?? '',
    password: process.env.DATABASE_URL?.split(':')[2]?.split('@')[0] ?? '',
    database: 'postgres',
  },
} satisfies Config;
