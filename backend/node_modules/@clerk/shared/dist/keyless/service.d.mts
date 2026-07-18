import { AccountlessApplication } from "./types.mjs";

//#region src/keyless/service.d.ts
/**
 * Storage adapter interface for keyless mode.
 * Implementations can use file system, cookies, or other storage mechanisms.
 *
 * Implementations are responsible for their own concurrency handling
 * (e.g., file locking for file-based storage).
 */
interface KeylessStorage {
  /**
   * Reads the stored keyless configuration.
   *
   * @returns The JSON string of the stored config, or empty string if not found.
   */
  read(): string;
  /**
   * Writes the keyless configuration to storage.
   *
   * @param data - The JSON string to store.
   */
  write(data: string): void;
  /**
   * Removes the keyless configuration from storage.
   */
  remove(): void;
}
/**
 * API adapter for keyless mode operations.
 * This abstraction allows the service to work without depending on @clerk/backend.
 */
interface KeylessAPI {
  /**
   * Creates a new accountless application.
   *
   * @param requestHeaders - Optional headers to include with the request.
   * @param source - Optional source value to include with the request.
   * @returns The created AccountlessApplication or null if failed.
   */
  createAccountlessApplication(requestHeaders?: Headers, source?: string): Promise<AccountlessApplication | null>;
  /**
   * Notifies the backend that onboarding is complete (instance has been claimed).
   *
   * @param requestHeaders - Optional headers to include with the request.
   * @param source - Optional source value to include with the request.
   * @returns The updated AccountlessApplication or null if failed.
   */
  completeOnboarding(requestHeaders?: Headers, source?: string): Promise<AccountlessApplication | null>;
}
/**
 * Options for creating a keyless service.
 */
interface KeylessServiceOptions {
  /**
   * Storage adapter for reading/writing keyless configuration.
   */
  storage: KeylessStorage;
  /**
   * API adapter for keyless operations (create application, complete onboarding).
   */
  api: KeylessAPI;
  /**
   * Optional: Framework name for metadata (e.g., 'Next.js', 'TanStack Start').
   */
  framework?: string;
  /**
   * Optional: Framework version for metadata.
   */
  frameworkVersion?: string;
}
/**
 * Result type for key resolution.
 */
interface KeylessResult {
  publishableKey: string | undefined;
  secretKey: string | undefined;
  claimUrl: string | undefined;
  apiKeysUrl: string | undefined;
}
/**
 * The keyless service interface.
 */
interface KeylessService {
  /**
   * Gets existing keyless keys or creates new ones via the API.
   */
  getOrCreateKeys: () => Promise<AccountlessApplication | null>;
  /**
   * Reads existing keyless keys without creating new ones.
   */
  readKeys: () => AccountlessApplication | undefined;
  /**
   * Removes the keyless configuration.
   */
  removeKeys: () => void;
  /**
   * Notifies the backend that the instance has been claimed/onboarded.
   * This should be called once when the user claims their instance.
   */
  completeOnboarding: () => Promise<AccountlessApplication | null>;
  /**
   * Logs a keyless mode message to the console (throttled to once per process).
   */
  logKeylessMessage: (claimUrl: string) => void;
  /**
   * Resolves Clerk keys, falling back to keyless mode if configured keys are missing.
   *
   * @param configuredPublishableKey - The publishable key from options or environment
   * @param configuredSecretKey - The secret key from options or environment
   * @returns The resolved keys (either configured or from keyless mode)
   */
  resolveKeysWithKeylessFallback: (configuredPublishableKey: string | undefined, configuredSecretKey: string | undefined) => Promise<KeylessResult>;
}
/**
 * Creates a keyless service that handles accountless application creation and storage.
 * This provides a simple API for frameworks to integrate keyless mode.
 *
 * @param options - Configuration for the service including storage and API adapters
 * @returns A keyless service instance
 *
 * @example
 * ```ts
 * import { createKeylessService } from '@clerk/shared/keyless';
 *
 * const keylessService = createKeylessService({
 *   storage: createFileStorage(),
 *   api: createKeylessAPI({ secretKey }),
 *   framework: 'TanStack Start',
 * });
 *
 * const keys = await keylessService.getOrCreateKeys(request);
 * if (keys) {
 *   console.log('Publishable Key:', keys.publishableKey);
 * }
 * ```
 */
declare function createKeylessService(options: KeylessServiceOptions): KeylessService;
//#endregion
export { KeylessAPI, KeylessService, KeylessServiceOptions, KeylessStorage, createKeylessService };