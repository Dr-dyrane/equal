import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getDatabaseUrl } from "@/db/connection";
import * as schema from "@/db/schema";

const databaseUrl = getDatabaseUrl();

export const sql = neon(databaseUrl);

export const db = drizzle(sql, {
  schema,
});
