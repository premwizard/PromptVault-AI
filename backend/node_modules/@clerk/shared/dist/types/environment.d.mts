import { ClerkResource } from "./resource.mjs";
import { CommerceSettingsResource } from "./commerceSettings.mjs";
import { DisplayConfigResource } from "./displayConfig.mjs";
import { OrganizationSettingsResource } from "./organizationSettings.mjs";
import { ProtectConfigResource } from "./protectConfig.mjs";
import { UserSettingsResource } from "./userSettings.mjs";
import { EnvironmentJSONSnapshot } from "./snapshots.mjs";
import { APIKeysSettingsResource } from "./apiKeysSettings.mjs";
import { AuthConfigResource } from "./authConfig.mjs";
import { EnableEnvironmentSettingParams } from "./devtools.mjs";

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