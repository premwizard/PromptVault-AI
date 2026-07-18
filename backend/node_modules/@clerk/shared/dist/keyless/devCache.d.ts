import { AccountlessApplication, PublicKeylessApplication } from "./types.js";

//#region src/keyless/devCache.d.ts
interface ClerkDevCache {
  __cache: Map<string, {
    expiresAt: number;
    data?: unknown;
  }>;
  /**
   * Log a message with throttling to prevent spam.
   */
  log: (params: {
    cacheKey: string;
    msg: string;
  }) => void;
  /**
   * Run an async callback with caching.
   */
  run: <T>(callback: () => Promise<T>, options: {
    cacheKey: string;
    onSuccessStale?: number;
    onErrorStale?: number;
  }) => Promise<T | undefined>;
}
declare global {
  var __clerk_internal_keyless_logger: ClerkDevCache | undefined;
}
/**
 * Creates a development-only cache for keyless mode logging and API calls.
 * This prevents console spam and duplicate API requests.
 *
 * @returns The cache instance or undefined in non-development environments
 */
declare function createClerkDevCache(): ClerkDevCache | undefined;
/**
 * Creates the console message shown when running in keyless mode.
 *
 * @param keys - The keyless application keys
 * @returns Formatted console message
 */
declare function createKeylessModeMessage(keys: AccountlessApplication | PublicKeylessApplication): string;
/**
 * Creates the console message shown when keys have been claimed.
 *
 * @returns Formatted console message
 */
declare function createConfirmationMessage(): string;
/**
 * Shared singleton instance of the development cache.
 */
declare const clerkDevelopmentCache: ClerkDevCache | undefined;
//#endregion
export { ClerkDevCache, clerkDevelopmentCache, createClerkDevCache, createConfirmationMessage, createKeylessModeMessage };