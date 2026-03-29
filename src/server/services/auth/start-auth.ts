import postmark from "postmark";
import {
  authStartSchema,
  type AuthStartInput,
  type AuthStartResult,
} from "@/lib/contracts/auth";
import { getPostmarkConfig } from "@/lib/auth/config";
import { AuthFlowError } from "@/lib/auth/errors";
import { getPostAuthDestination, sanitizeAuthRedirect } from "@/lib/auth/guards";
import { createMagicLinkToken } from "@/lib/auth/session";

function isProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

function buildAuthEmail(input: {
  verifyUrl: string;
  mode: "start" | "signin";
}) {
  const actionLabel =
    input.mode === "start" ? "Start scheduling with Equal" : "Sign in to Equal";

  return {
    subject: actionLabel,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; color: #171a31; line-height: 1.6;">
        <p style="margin: 0 0 16px;">Continue with your work email.</p>
        <p style="margin: 0 0 24px;">
          <a href="${input.verifyUrl}" style="display: inline-block; border-radius: 999px; background: #171a31; color: #ffffff; text-decoration: none; padding: 12px 20px; font-weight: 600;">
            ${actionLabel}
          </a>
        </p>
        <p style="margin: 0; color: #5e6488;">This link expires in 20 minutes.</p>
      </div>
    `,
    text: `${actionLabel}: ${input.verifyUrl}\n\nThis link expires in 20 minutes.`,
  };
}

export async function startAuth(
  input: AuthStartInput,
  options: { origin: string },
): Promise<AuthStartResult> {
  const parsed = authStartSchema.parse(input);
  const redirectTo = sanitizeAuthRedirect(
    parsed.next,
    getPostAuthDestination(parsed.mode),
  );
  const token = await createMagicLinkToken({
    type: "magic-link",
    mode: parsed.mode,
    email: parsed.email,
    name: parsed.name,
    redirectTo,
  });

  const verifyUrl = new URL("/auth/verify", options.origin);
  verifyUrl.searchParams.set("token", token);

  const { serverToken, fromEmail } = getPostmarkConfig();

  if (!serverToken || !fromEmail) {
    if (process.env.NODE_ENV === "production") {
      throw new AuthFlowError(
        "Postmark is not configured for auth emails.",
        "server_misconfigured",
      );
    }

    return {
      ok: true,
      emailedTo: parsed.email,
      emailSent: false,
      verifyUrl: verifyUrl.toString(),
    };
  }

  const client = new postmark.ServerClient(serverToken);
  const message = buildAuthEmail({
    verifyUrl: verifyUrl.toString(),
    mode: parsed.mode,
  });

  try {
    await client.sendEmail({
      From: fromEmail,
      To: parsed.email,
      Subject: message.subject,
      HtmlBody: message.html,
      TextBody: message.text,
      MessageStream: "outbound",
    });
  } catch (error) {
    if (!isProductionRuntime()) {
      console.warn("Equal auth email send failed; using local verify URL fallback.", {
        email: parsed.email,
        mode: parsed.mode,
        message: error instanceof Error ? error.message : String(error),
      });

      return {
        ok: true,
        emailedTo: parsed.email,
        emailSent: false,
        verifyUrl: verifyUrl.toString(),
      };
    }

    throw new AuthFlowError("Could not send auth email.", "email_send_failed");
  }

  return {
    ok: true,
    emailedTo: parsed.email,
    emailSent: true,
    verifyUrl:
      process.env.NODE_ENV === "production" ? undefined : verifyUrl.toString(),
  };
}
