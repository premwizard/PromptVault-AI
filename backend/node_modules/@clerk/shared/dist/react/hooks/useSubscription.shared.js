const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useSubscription.shared.ts
function useSubscriptionCacheKeys(params) {
	const { userId, orgId, for: forType } = params;
	return (0, react.useMemo)(() => {
		const safeOrgId = forType === "organization" ? orgId : void 0;
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.SUBSCRIPTION_KEY,
			authenticated: true,
			tracked: {
				userId,
				orgId: safeOrgId
			},
			untracked: { args: { orgId: safeOrgId } }
		});
	}, [
		userId,
		orgId,
		forType
	]);
}

//#endregion
exports.useSubscriptionCacheKeys = useSubscriptionCacheKeys;