import { ClerkResource } from "./resource.js";
import { CommerceSettingsResource } from "./commerceSettings.js";
import { DisplayConfigResource } from "./displayConfig.js";
import { OrganizationSettingsResource } from "./organizationSettings.js";
import { ProtectConfigResource } from "./protectConfig.js";
import { UserSettingsResource } from "./userSettings.js";
import { EnvironmentJSONSnapshot } from "./snapshots.js";
import { APIKeysSettingsResource } from "./apiKeysSettings.js";
import { AuthConfigResource } from "./authConfig.js";
import { EnableEnvironmentSettingParams } from "./devtools.js";

//#region src/types/environment.d.ts
interface EnvironmentResource extends ClerkResource {
  userSettings: UserSettingsResource;
  organizationSettings: OrganizationSettingsResource;
  authConfig: AuthConfigResource;
  displayConfig: DisplayConfigResource;
  commerceSettings: CommerceSettingsResource;
  apiKeysSettings: APIKeysSettingsResource;
  protectConfig: ProtectConfigResource;
  isSingleSession: () => boolean;
  isProduction: () => boolean;
  isDevelopmentOrStaging: () => boolean;
  onWindowLocationHost: () => boolean;
  maintenanceMode: boolean;
  clientDebugMode: boolean;
  partitionedCookies: boolean;
  __internal_toSnapshot: () => EnvironmentJSONSnapshot;
  __internal_enableEnvironmentSetting: (params: EnableEnvironmentSettingParams) => Promise<void>;
}
//#endregion
export { EnvironmentResource };