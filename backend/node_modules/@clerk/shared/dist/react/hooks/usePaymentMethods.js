const require_stable_keys = require('../stable-keys.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_createBillingPaginatedHook = require('./createBillingPaginatedHook.js');

//#region src/react/hooks/usePaymentMethods.tsx
/**
* @internal
*/
const usePaymentMethods = require_createBillingPaginatedHook.createBillingPaginatedHook({
	hookName: "usePaymentMethods",
	resourceType: require_stable_keys.STABLE_KEYS.PAYMENT_METHODS_KEY,
	useFetcher: (resource) => {
		const organization = require_useOrganizationBase.useOrganizationBase();
		const user = require_useUserBase.useUserBase();
		if (resource === "organization") return organization?.getPaymentMethods;
		return user?.getPaymentMethods;
	}
});

//#endregion
exports.usePaymentMethods = usePaymentMethods;