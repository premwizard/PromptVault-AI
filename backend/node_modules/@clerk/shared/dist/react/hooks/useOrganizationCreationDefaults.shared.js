const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useOrganizationCreationDefaults.shared.ts
function useOrganizationCreationDefaultsCacheKeys(params) {
	const { userId } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.ORGANIZATION_CREATION_DEFAULTS_KEY,
			authenticated: Boolean(userId),
			tracked: { userId: userId ?? null },
			untracked: { args: {} }
		});
	}, [userId]);
}

//#endregion
exports.useOrganizationCreationDefaultsCacheKeys = useOrganizationCreationDefaultsCacheKeys;