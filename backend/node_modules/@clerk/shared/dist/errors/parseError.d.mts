import { ClerkAPIError } from "./clerkApiError.mjs";
import { ClerkAPIError as ClerkAPIError$1, ClerkAPIErrorJSON } from "../types/errors.mjs";
//#region src/errors/parseError.d.ts
/**
 * Parses an array of ClerkAPIErrorJSON objects into an array of ClerkAPIError objects.
 *
 * @internal
 */
declare function parseErrors(data?: ClerkAPIErrorJSON[]): ClerkAPIError$1[];
/**
 * Parses a ClerkAPIErrorJSON object into a ClerkAPIError object.
 *
 * @deprecated Use `ClerkAPIError` class instead
 *
 * @internal
 */
declare function parseError(error: ClerkAPIErrorJSON): ClerkAPIError$1;
/**
 * Converts a ClerkAPIError object into a ClerkAPIErrorJSON object.
 *
 * @internal
 */
declare function errorToJSON(error: ClerkAPIError | null): ClerkAPIErrorJSON;
//#endregion
export { errorToJSON, parseError, parseErrors };