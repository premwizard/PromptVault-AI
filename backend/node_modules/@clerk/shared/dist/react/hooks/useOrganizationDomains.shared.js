const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useOrganizationDomains.shared.ts
/**
* @internal
*/
function useOrganizationDomainsCacheKeys(params) {
	const { organizationId, enrollmentMode } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.ORGANIZATION_DOMAINS_KEY,
			authenticated: Boolean(organizationId),
			tracked: {
				organizationId: organizationId ?? null,
				enrollmentMode: enrollmentMode ?? null
			},
			untracked: { args: {} }
		});
	}, [organizationId, enrollmentMode]);
}

//#endregion
exports.useOrganizationDomainsCacheKeys = useOrganizationDomainsCacheKeys;