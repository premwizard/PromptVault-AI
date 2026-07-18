import { ClerkRuntimeError } from "./clerkRuntimeError.mjs";

//#region src/errors/clerkOfflineError.d.ts
/**
 * Error thrown when a network request fails due to the client being offline.
 *
 * This error is thrown instead of returning `null` to make it explicit that
 * the failure was due to network conditions, not authentication state.
 *
 * @example
 * ```typescript
 * try {
 *   const token = await session.getToken();
 * } catch (error) {
 *   if (ClerkOfflineError.is(error)) {
 *     // Handle offline scenario
 *     showOfflineScreen();
 *   }
 * }
 * ```
 */
declare class ClerkOfflineError extends ClerkRuntimeError {
  static kind: string;
  static readonly ERROR_CODE: "clerk_offline";
  constructor(message: string);
  /**
   * Type guard to check if an error is a ClerkOfflineError.
   * This checks both instanceof and the error code to support cross-bundle/cross-realm errors
   *
   * @example
   * ```typescript
   * try {
   *   const token = await session.getToken();
   * } catch (error) {
   *   if (ClerkOfflineError.is(error)) {
   *     // error is typed as ClerkOfflineError
   *     console.log('User is offline');
   *   }
   * }
   * ```
   */
  static is(error: unknown): error is ClerkOfflineError;
}
//#endregion
export { ClerkOfflineError };