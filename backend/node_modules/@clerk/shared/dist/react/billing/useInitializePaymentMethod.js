const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('../hooks/useClearQueriesOnSignOut.js');
const require_useUserBase = require('../hooks/base/useUserBase.js');
const require_useOrganizationBase = require('../hooks/base/useOrganizationBase.js');
const require_useBillingIsEnabled = require('../hooks/useBillingIsEnabled.js');
let react = require("react");

//#region src/react/billing/useInitializePaymentMethod.tsx
/**
* @internal
*/
function useInitializePaymentMethod(options) {
	const { for: forType } = options ?? {};
	const organization = require_useOrganizationBase.useOrganizationBase();
	const user = require_useUserBase.useUserBase();
	const resource = forType === "organization" ? organization : user;
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled(options);
	const stableKey = "billing-payment-method-initialize";
	const authenticated = true;
	const queryKey = (0, react.useMemo)(() => {
		return [
			stableKey,
			authenticated,
			{ resourceId: resource?.id },
			{}
		];
	}, [resource?.id]);
	const isEnabled = Boolean(resource?.id) && billingEnabled;
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: user === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: async () => {
			if (!resource) return;
			return resource.initializePaymentMethod({ gateway: "stripe" });
		},
		enabled: isEnabled,
		staleTime: 1e3 * 60,
		refetchOnWindowFocus: false,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(isEnabled)
	});
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const initializePaymentMethod = (0, react.useCallback)(async () => {
		if (!resource) return;
		const result = await resource.initializePaymentMethod({ gateway: "stripe" });
		queryClient.setQueryData(queryKey, result);
		return result;
	}, [
		queryClient,
		queryKey,
		resource
	]);
	return {
		initializedPaymentMethod: query.data ?? void 0,
		initializePaymentMethod
	};
}

//#endregion
exports.useInitializePaymentMethod = useInitializePaymentMethod;