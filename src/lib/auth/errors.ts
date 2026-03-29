export class AuthFlowError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "invalid_token"
      | "expired_token"
      | "missing_token"
      | "unauthorized"
      | "email_send_failed"
      | "server_misconfigured" = "unauthorized",
  ) {
    super(message);
    this.name = "AuthFlowError";
  }
}
