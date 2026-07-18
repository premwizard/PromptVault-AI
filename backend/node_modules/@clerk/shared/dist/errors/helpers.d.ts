import { ClerkAPIResponseError } from "./clerkApiResponseError.js";
import { ClerkRuntimeError } from "./clerkRuntimeError.js";
import { EmailLinkError } from "./emailLinkError.js";
import { MetamaskError } from "./metamaskError.js";

//#region src/errors/helpers.d.ts
/**
 * Checks if the provided error object is an unauthorized error.
 *
 * @internal
 *
 * @deprecated This is no longer used, and will be removed in the next major version.
 */
declare function isUnauthorizedError(e: any): boolean;
/**
 * Checks if the provided error object is a captcha error.
 *
 * @internal
 */
declare function isCaptchaError(e: ClerkAPIResponseError): boolean;
/**
 * Checks if the provided error is a 4xx error.
 *
 * @internal
 */
declare function is4xxError(e: any): boolean;
/**
 * Checks if the provided error is a 429 (Too Many Requests) error.
 *
 * @internal
 */
declare function is429Error(e: any): boolean;
/**
 * Checks if the provided error indicates the user's session is no longer valid
 * and should trigger the unauthenticated flow (e.g. sign-out / redirect to sign-in).
 *
 * Only matches explicit authentication failure status codes:
 * - 401: session is invalid or expired
 * - 422: invalid session state (e.g. missing_expired_token)
 * - 403: terminal user state (e.g. user_banned, user_deactivated)
 *
 * 404 is intentionally excluded despite being returned for "session not found",
 * because it's also returned for unrelated resources (org not found, JWT template
 * not found) and shares the same `resource_not_found` error code, making it
 * impossible to distinguish. Session-not-found 401s are already handled directly
 * by Base._fetch.
 *
 * @internal
 */
declare function isUnauthenticatedError(e: any): boolean;
/**
 * Checks if the provided error is a network error.
 *
 * @internal
 */
declare function isNetworkError(e: any): boolean;
/**
 * Checks if the provided error is either a ClerkAPIResponseError, a ClerkRuntimeError, or a MetamaskError.
 */
declare function isKnownError(error: any): error is ClerkAPIResponseError | ClerkRuntimeError | MetamaskError;
/**
 * Checks if the provided error is a Clerk runtime error indicating a reverification was cancelled.
 */
declare function isReverificationCancelledError(err: any): boolean;
/**
 * Checks if the provided error is a Metamask error.
 */
declare function isMetamaskError(err: any): err is MetamaskError;
/**
 * Checks if the provided error is clerk api response error indicating a user is locked.
 */
declare function isUserLockedError(err: any): boolean;
/**
 * Checks if the provided error is a clerk api response error indicating a password was pwned.
 *
 * @internal
 */
declare function isPasswordPwnedError(err: any): boolean;
/**
 * Checks if the provided error is a clerk api response error indicating a password was compromised.
 *
 * @internal
 */
declare function isPasswordCompromisedError(err: any): boolean;
/**
 * Checks if the provided error is an EmailLinkError.
 */
declare function isEmailLinkError(err: Error): err is EmailLinkError;
//#endregion
export { is429Error, is4xxError, isCaptchaError, isEmailLinkError, isKnownError, isMetamaskError, isNetworkError, isPasswordCompromisedError, isPasswordPwnedError, isReverificationCancelledError, isUnauthenticatedError, isUnauthorizedError, isUserLockedError };