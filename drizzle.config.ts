import { defineConfig } from "drizzle-kit";
import { getDatabaseUrl } from "./src/db/connection";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});
