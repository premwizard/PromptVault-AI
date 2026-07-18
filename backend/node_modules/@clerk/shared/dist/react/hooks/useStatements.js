const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createBillingPaginatedHook = require('./createBillingPaginatedHook.js');

//#region src/react/hooks/useStatements.tsx
/**
* @internal
*/
const useStatements = require_createBillingPaginatedHook.createBillingPaginatedHook({
	hookName: "useStatements",
	resourceType: require_stable_keys.STABLE_KEYS.STATEMENTS_KEY,
	useFetcher: () => {
		const clerk = require_contexts.useClerkInstanceContext();
		if (clerk.loaded) return clerk.billing.getStatements;
	}
});

//#endregion
exports.useStatements = useStatements;