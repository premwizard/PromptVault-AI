import { ClerkError, ClerkErrorParams } from "./clerkError.mjs";

//#region src/errors/clerkRuntimeError.d.ts
type ClerkRuntimeErrorOptions = Omit<ClerkErrorParams, 'message'>;
/**
 * Custom error class for representing Clerk runtime errors.
 *
 * @class ClerkRuntimeError
 *
 * @example
 *   throw new ClerkRuntimeError('An error occurred', { code: 'password_invalid' });
 */
declare class ClerkRuntimeError extends ClerkError {
  static kind: string;
  /**
   * @deprecated Use `clerkError` property instead. This property is maintained for backward compatibility.
   */
  readonly clerkRuntimeError: true;
  constructor(message: string, options: ClerkRuntimeErrorOptions);
}
/**
 * Type guard to check if an error is a ClerkRuntimeError.
 * Can be called as a standalone function or as a method on an error object.
 *
 * @example
 * // As a standalone function
 * if (isClerkRuntimeError(error)) { ... }
 *
 * // As a method (when attached to error object)
 * if (error.isClerkRuntimeError()) { ... }
 */
declare const isClerkRuntimeError: {
  (error: unknown): error is ClerkRuntimeError;
  (this: unknown): this is ClerkRuntimeError;
};
//#endregion
export { ClerkRuntimeError, isClerkRuntimeError };