function getSecret(envKey: string, salt: string) {
  const configured = process.env[envKey];

  if (configured) {
    return configured;
  }

  if (process.env.NODE_ENV !== "production") {
    return `equal-local-dev::${salt}`;
  }

  throw new Error(`${envKey} is required in production.`);
}

export const authConfig = {
  sessionCookieName: "equal.session",
  sessionDurationSeconds: 60 * 60 * 24 * 14,
  magicLinkDurationSeconds: 60 * 20,
};

export function getSessionSecret() {
  return getSecret("AUTH_SESSION_SECRET", "session");
}

export function getMagicLinkSecret() {
  return getSecret("AUTH_MAGIC_LINK_SECRET", "magic-link");
}

export function getPostmarkConfig() {
  return {
    serverToken: process.env.POSTMARK_API_KEY,
    fromEmail: process.env.POSTMARK_FROM_EMAIL,
  };
}
