//#region src/constants.ts
const LEGACY_DEV_INSTANCE_SUFFIXES = [
	".lcl.dev",
	".lclstage.dev",
	".lclclerk.com"
];
const CURRENT_DEV_INSTANCE_SUFFIXES = [
	".accounts.dev",
	".accountsstage.dev",
	".accounts.lclclerk.com"
];
const DEV_OR_STAGING_SUFFIXES = [
	".lcl.dev",
	".stg.dev",
	".lclstage.dev",
	".stgstage.dev",
	".dev.lclclerk.com",
	".stg.lclclerk.com",
	".accounts.lclclerk.com",
	"accountsstage.dev",
	"accounts.dev"
];
const LOCAL_ENV_SUFFIXES = [
	".lcl.dev",
	"lclstage.dev",
	".lclclerk.com",
	".accounts.lclclerk.com"
];
const STAGING_ENV_SUFFIXES = [".accountsstage.dev"];
const LOCAL_API_URL = "https://api.lclclerk.com";
const STAGING_API_URL = "https://api.clerkstage.dev";
const PROD_API_URL = "https://api.clerk.com";
const LOCAL_FAPI_URL = "https://frontend-api.lclclerk.com";
const STAGING_FAPI_URL = "https://frontend-api.clerkstage.dev";
const PROD_FAPI_URL = "https://frontend-api.clerk.dev";
const DEFAULT_PROXY_PATH = "/__clerk";
/**
* Returns the URL for a static image
* using the new img.clerk.com service
*/
function iconImageUrl(id, format = "svg") {
	return `https://img.clerk.com/static/${id}.${format}`;
}

//#endregion
export { CURRENT_DEV_INSTANCE_SUFFIXES, DEFAULT_PROXY_PATH, DEV_OR_STAGING_SUFFIXES, LEGACY_DEV_INSTANCE_SUFFIXES, LOCAL_API_URL, LOCAL_ENV_SUFFIXES, LOCAL_FAPI_URL, PROD_API_URL, PROD_FAPI_URL, STAGING_API_URL, STAGING_ENV_SUFFIXES, STAGING_FAPI_URL, iconImageUrl };
//# sourceMappingURL=constants.mjs.map