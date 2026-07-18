import { KeylessService } from "./service.mjs";

//#region src/keyless/resolveKeysWithKeylessFallback.d.ts
interface KeylessResult {
  publishableKey: string | undefined;
  secretKey: string | undefined;
  claimUrl: string | undefined;
  apiKeysUrl: string | undefined;
}
/**
 * Resolves Clerk keys, falling back to keyless mode in development if configured keys are missing.
 *
 * @param configuredPublishableKey - The publishable key from options or environment
 * @param configuredSecretKey - The secret key from options or environment
 * @param keylessService - The keyless service instance (or null if unavailable)
 * @param canUseKeyless - Whether keyless mode is enabled in the current environment
 * @returns The resolved keys (either configured or from keyless mode)
 */
declare function resolveKeysWithKeylessFallback(configuredPublishableKey: string | undefined, configuredSecretKey: string | undefined, keylessService: KeylessService | null, canUseKeyless: boolean): Promise<KeylessResult>;
//#endregion
export { KeylessResult, resolveKeysWithKeylessFallback };