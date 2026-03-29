import { SignJWT, errors, jwtVerify, type JWTPayload } from "jose";
import { authConfig, getMagicLinkSecret, getSessionSecret } from "@/lib/auth/config";
import { AuthFlowError } from "@/lib/auth/errors";
import type {
  MagicLinkTokenClaims,
  SessionTokenClaims,
} from "@/lib/auth/claims";

const encoder = new TextEncoder();

function getEpochDate(secondsFromNow: number) {
  return Math.floor(Date.now() / 1000) + secondsFromNow;
}

function toSecret(secret: string) {
  return encoder.encode(secret);
}

function assertMagicLinkPayload(payload: JWTPayload): asserts payload is JWTPayload &
  MagicLinkTokenClaims {
  if (
    payload.type !== "magic-link" ||
    typeof payload.mode !== "string" ||
    typeof payload.email !== "string" ||
    typeof payload.redirectTo !== "string"
  ) {
    throw new AuthFlowError("Invalid magic link token.", "invalid_token");
  }
}

function assertSessionPayload(payload: JWTPayload): asserts payload is JWTPayload &
  SessionTokenClaims {
  if (
    payload.type !== "session" ||
    typeof payload.sessionId !== "string" ||
    typeof payload.userId !== "string" ||
    typeof payload.organizationId !== "string" ||
    typeof payload.role !== "string" ||
    !Array.isArray(payload.permissions)
  ) {
    throw new AuthFlowError("Invalid session token.", "invalid_token");
  }
}

export async function hashToken(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createMagicLinkToken(claims: MagicLinkTokenClaims) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(getEpochDate(authConfig.magicLinkDurationSeconds))
    .sign(toSecret(getMagicLinkSecret()));
}

export async function verifyMagicLinkToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, toSecret(getMagicLinkSecret()));
    assertMagicLinkPayload(payload);
    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new AuthFlowError("Magic link expired.", "expired_token");
    }

    throw new AuthFlowError("Magic link invalid.", "invalid_token");
  }
}

export async function createSessionToken(claims: SessionTokenClaims) {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(getEpochDate(authConfig.sessionDurationSeconds))
    .sign(toSecret(getSessionSecret()));
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, toSecret(getSessionSecret()));
    assertSessionPayload(payload);
    return payload;
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new AuthFlowError("Session expired.", "expired_token");
    }

    throw new AuthFlowError("Session invalid.", "invalid_token");
  }
}
