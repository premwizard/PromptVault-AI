//#region src/errors/emailLinkError.d.ts
declare class EmailLinkError extends Error {
  code: string;
  constructor(code: string);
}
/**
 * @deprecated Use `EmailLinkErrorCodeStatus` instead.
 *
 * @internal
 */
declare const EmailLinkErrorCode: {
  Expired: string;
  Failed: string;
  ClientMismatch: string;
};
declare const EmailLinkErrorCodeStatus: {
  readonly Expired: "expired";
  readonly Failed: "failed";
  readonly ClientMismatch: "client_mismatch";
};
//#endregion
export { EmailLinkError, EmailLinkErrorCode, EmailLinkErrorCodeStatus };