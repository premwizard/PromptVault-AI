import { ClerkResource } from "./resource.mjs";
import { PhoneCodeChannel } from "./phoneCodeChannel.mjs";
import { AuthConfigJSONSnapshot } from "./snapshots.mjs";

//#region src/types/authConfig.d.ts
interface AuthConfigResource extends ClerkResource {
  /**
   * Enabled single session configuration at the instance level.
   */
  singleSessionMode: boolean;
  /**
   * Timestamp of when the instance was claimed. This only applies to applications created with the Keyless mode.
   *
   * @default null
   */
  claimedAt: Date | null;
  /**
   * Whether Reverification is enabled at the instance level.
   */
  reverification: boolean;
  /**
   * Preferred channels for phone code providers.
   */
  preferredChannels: Record<string, PhoneCodeChannel> | null;
  sessionMinter: boolean;
  __internal_toSnapshot: () => AuthConfigJSONSnapshot;
}
//#endregion
export { AuthConfigResource };