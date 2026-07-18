const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createBillingPaginatedHook = require('./createBillingPaginatedHook.js');

//#region src/react/hooks/usePaymentAttempts.tsx
/**
* @internal
*/
const usePaymentAttempts = require_createBillingPaginatedHook.createBillingPaginatedHook({
	hookName: "usePaymentAttempts",
	resourceType: require_stable_keys.STABLE_KEYS.PAYMENT_ATTEMPTS_KEY,
	useFetcher: () => {
		const clerk = require_contexts.useClerkInstanceContext();
		if (clerk.loaded) return clerk.billing.getPaymentAttempts;
	}
});

//#endregion
exports.usePaymentAttempts = usePaymentAttempts;