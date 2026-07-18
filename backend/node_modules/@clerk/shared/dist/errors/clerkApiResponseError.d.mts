import { ClerkAPIError } from "./clerkApiError.mjs";
import { ClerkError, ClerkErrorParams } from "./clerkError.mjs";
import { ClerkAPIErrorJSON, ClerkAPIResponseError as ClerkAPIResponseError$1 } from "../types/errors.mjs";
//#region src/errors/clerkApiResponseError.d.ts
interface ClerkAPIResponseOptions extends Omit<ClerkErrorParams, 'message' | 'code'> {
  data: ClerkAPIErrorJSON[];
  status: number;
  clerkTraceId?: string;
  retryAfter?: number;
}
declare class ClerkAPIResponseError extends ClerkError implements ClerkAPIResponseError$1 {
  static kind: string;
  status: number;
  clerkTraceId?: string;
  retryAfter?: number;
  errors: ClerkAPIError[];
  constructor(message: string, options: ClerkAPIResponseOptions);
  toString(): string;
  protected static formatMessage(name: string, msg: string, _: string, __: string | undefined): string;
}
/**
 * Type guard to check if an error is a ClerkAPIResponseError.
 * Can be called as a standalone function or as a method on an error object.
 *
 * @example
 * // As a standalone function
 * if (isClerkAPIResponseError(error)) { ... }
 *
 * // As a method (when attached to error object)
 * if (error.isClerkAPIResponseError()) { ... }
 */
declare const isClerkAPIResponseError: {
  (error: unknown): error is ClerkAPIResponseError;
  (this: unknown): this is ClerkAPIResponseError;
};
//#endregion
export { ClerkAPIResponseError, isClerkAPIResponseError };