import { ClerkResource } from "./resource.mjs";
import { APIKeysSettingsJSONSnapshot } from "./snapshots.mjs";
import { ClerkResourceJSON } from "./json.mjs";

//#region src/types/apiKeysSettings.d.ts
interface APIKeysSettingsJSON extends ClerkResourceJSON {
  user_api_keys_enabled: boolean;
  orgs_api_keys_enabled: boolean;
}
interface APIKeysSettingsResource extends ClerkResource {
  user_api_keys_enabled: boolean;
  orgs_api_keys_enabled: boolean;
  __internal_toSnapshot: () => APIKeysSettingsJSONSnapshot;
}
//#endregion
export { APIKeysSettingsJSON, APIKeysSettingsResource };