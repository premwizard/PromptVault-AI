import { ClerkError } from "./clerkError.js";
import { ClerkAPIResponseError } from "./clerkApiResponseError.js";
import { ClerkRuntimeError } from "./clerkRuntimeError.js";

//#region src/errors/globalHookError.d.ts
/**
 * Creates a ClerkGlobalHookError object from a ClerkError instance.
 * It's a wrapper for all the different instances of Clerk errors that can
 * be returned when using Clerk hooks.
 */
declare function createClerkGlobalHookError(error: ClerkError): ClerkError & {
  readonly isClerkAPIResponseError: {
    (error: unknown): error is ClerkAPIResponseError;
    (this: unknown): this is ClerkAPIResponseError;
  };
  readonly isClerkRuntimeError: {
    (error: unknown): error is ClerkRuntimeError;
    (this: unknown): this is ClerkRuntimeError;
  };
};
type ClerkGlobalHookError = ReturnType<typeof createClerkGlobalHookError>;
//#endregion
export { ClerkGlobalHookError, createClerkGlobalHookError };