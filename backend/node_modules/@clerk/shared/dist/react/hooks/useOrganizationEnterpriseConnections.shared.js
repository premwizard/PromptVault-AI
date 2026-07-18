const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useOrganizationEnterpriseConnections.shared.ts
/**
* @internal
*/
function useOrganizationEnterpriseConnectionsCacheKeys(params) {
	const { organizationId, withOrganizationAccountLinking = false } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.ORGANIZATION_ENTERPRISE_CONNECTIONS_KEY,
			authenticated: Boolean(organizationId),
			tracked: {
				organizationId: organizationId ?? null,
				withOrganizationAccountLinking
			},
			untracked: { args: {} }
		});
	}, [organizationId, withOrganizationAccountLinking]);
}

//#endregion
exports.useOrganizationEnterpriseConnectionsCacheKeys = useOrganizationEnterpriseConnectionsCacheKeys;