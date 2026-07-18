const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useUserEnterpriseConnections.shared.ts
/**
* @internal
*/
function useUserEnterpriseConnectionsCacheKeys(params) {
	const { userId, withOrganizationAccountLinking = false } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.USER_ENTERPRISE_CONNECTIONS_KEY,
			authenticated: Boolean(userId),
			tracked: {
				userId: userId ?? null,
				withOrganizationAccountLinking
			},
			untracked: { args: {} }
		});
	}, [userId, withOrganizationAccountLinking]);
}

//#endregion
exports.useUserEnterpriseConnectionsCacheKeys = useUserEnterpriseConnectionsCacheKeys;