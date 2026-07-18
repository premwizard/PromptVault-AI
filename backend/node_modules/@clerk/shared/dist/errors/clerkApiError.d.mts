import { ClerkAPIError as ClerkAPIError$1, ClerkAPIErrorJSON } from "../types/errors.mjs";
//#region src/errors/clerkApiError.d.ts
type ClerkAPIErrorMeta = Record<string, unknown>;
/**
 * This error contains the specific error message, code, and any additional metadata that was returned by the Clerk API.
 */
declare class ClerkAPIError<Meta extends ClerkAPIErrorMeta = any> implements ClerkAPIError$1 {
  static kind: string;
  readonly code: string;
  readonly message: string;
  readonly longMessage: string | undefined;
  readonly meta: Meta;
  constructor(json: ClerkAPIErrorJSON);
}
/**
 * Type guard to check if a value is a ClerkAPIError instance.
 */
declare const isClerkAPIError: {
  (error: unknown): error is ClerkAPIError<ClerkAPIErrorMeta>;
  (this: unknown): this is ClerkAPIError<ClerkAPIErrorMeta>;
};
//#endregion
export { ClerkAPIError, isClerkAPIError };