import { z } from "zod";

export const authModeValues = ["start", "signin"] as const;

export const authStartSchema = z.object({
  mode: z.enum(authModeValues),
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  next: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  name: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((value) => value || undefined),
});

export type AuthMode = (typeof authModeValues)[number];
export type AuthStartInput = z.input<typeof authStartSchema>;
export type AuthStartPayload = z.output<typeof authStartSchema>;

export type AuthStartResult = {
  ok: true;
  emailedTo: string;
  emailSent: boolean;
  verifyUrl?: string;
};
