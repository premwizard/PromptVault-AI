//#region src/errors/clerkError.d.ts
interface ClerkErrorParams {
  /**
   * A message that describes the error. This is typically intented to be showed to the developers.
   * It should not be shown to the user or parsed directly as the message contents are not guaranteed
   * to be stable - use the `code` property instead.
   */
  message: string;
  /**
   * A machine-stable code that identifies the error.
   */
  code: string;
  /**
   * A user-friendly message that describes the error and can be displayed to the user.
   * This message defaults to English but can be usually translated to the user's language
   * by matching the `code` property to a localized message.
   */
  longMessage?: string;
  /**
   * The cause of the error, typically an `Error` instance that was caught and wrapped by the Clerk error handler.
   */
  cause?: Error;
  /**
   * A URL to the documentation for the error.
   */
  docsUrl?: string;
}
declare class ClerkError extends Error {
  static kind: string;
  readonly clerkError: true;
  readonly code: string;
  readonly longMessage: string | undefined;
  readonly docsUrl: string | undefined;
  readonly cause: Error | undefined;
  get name(): string;
  constructor(opts: ClerkErrorParams);
  toString(): string;
  protected static formatMessage(name: string, msg: string, code: string, docsUrl: string | undefined): string;
}
/**
 * Type guard to check if a value is a ClerkError instance.
 */
declare function isClerkError(val: unknown): val is ClerkError;
//#endregion
export { ClerkError, ClerkErrorParams, isClerkError };