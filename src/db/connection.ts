const DATABASE_URL_KEYS = ["DATABASE_URL", "DATABASE_URL_UNPOOLED"] as const;

export function getDatabaseUrl() {
  for (const key of DATABASE_URL_KEYS) {
    const value = process.env[key];

    if (value) {
      return value;
    }
  }

  throw new Error(
    "DATABASE_URL is required for database access. Set DATABASE_URL or DATABASE_URL_UNPOOLED.",
  );
}
