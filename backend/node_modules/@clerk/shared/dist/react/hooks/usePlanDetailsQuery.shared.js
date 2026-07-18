const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/usePlanDetailsQuery.shared.ts
function usePlanDetailsQueryCacheKeys(params) {
	const { planId } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.BILLING_PLANS_KEY,
			authenticated: false,
			tracked: { planId: planId ?? null },
			untracked: { args: { id: planId ?? void 0 } }
		});
	}, [planId]);
}

//#endregion
exports.usePlanDetailsQueryCacheKeys = usePlanDetailsQueryCacheKeys;