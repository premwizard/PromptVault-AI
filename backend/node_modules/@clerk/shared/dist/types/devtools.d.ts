import { ClerkResource } from "./resource.js";

//#region src/types/devtools.d.ts
type EnableEnvironmentSettingParams = {
  enable_organizations: boolean;
  organization_allow_personal_accounts?: boolean;
};
/**
 * @internal
 */
interface DevToolsResource extends ClerkResource {
  __internal_enableEnvironmentSetting: (params: EnableEnvironmentSettingParams) => Promise<void>;
}
//#endregion
export { DevToolsResource, EnableEnvironmentSettingParams };