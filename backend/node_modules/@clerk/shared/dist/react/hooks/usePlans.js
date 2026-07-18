const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createBillingPaginatedHook = require('./createBillingPaginatedHook.js');

//#region src/react/hooks/usePlans.tsx
/**
* @internal
*/
const usePlans = require_createBillingPaginatedHook.createBillingPaginatedHook({
	hookName: "usePlans",
	resourceType: require_stable_keys.STABLE_KEYS.PLANS_KEY,
	useFetcher: (_for) => {
		const clerk = require_contexts.useClerkInstanceContext();
		if (!clerk.loaded) return;
		return (params) => clerk.billing.getPlans({
			...params,
			for: _for
		});
	},
	options: { unauthenticated: true }
});

//#endregion
exports.usePlans = usePlans;