const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useBillingIsEnabled = require('./useBillingIsEnabled.js');
const require_useSubscription_shared = require('./useSubscription.shared.js');
let react = require("react");

//#region src/react/hooks/useSubscription.tsx
const HOOK_NAME = "useSubscription";
/**
* @internal
*/
function useSubscription(params) {
	require_contexts.useAssertWrappedByClerkProvider(HOOK_NAME);
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled(params);
	const recordedRef = (0, react.useRef)(false);
	(0, react.useEffect)(() => {
		if (!recordedRef.current && clerk?.telemetry) {
			clerk.telemetry.record(require_method_called.eventMethodCalled(HOOK_NAME));
			recordedRef.current = true;
		}
	}, [clerk]);
	const keepPreviousData = params?.keepPreviousData ?? false;
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const { queryKey, invalidationKey, stableKey, authenticated } = require_useSubscription_shared.useSubscriptionCacheKeys({
		userId: user?.id,
		orgId: organization?.id,
		for: params?.for
	});
	const queriesEnabled = Boolean(user?.id && billingEnabled);
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: user === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: ({ queryKey }) => {
			const obj = queryKey[3];
			return clerk.billing.getSubscription(obj.args);
		},
		staleTime: 1e3 * 60,
		enabled: queriesEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData && queriesEnabled)
	});
	const revalidate = (0, react.useCallback)(() => queryClient.invalidateQueries({ queryKey: invalidationKey }), [queryClient, invalidationKey]);
	return {
		data: query.data,
		error: query.error ?? void 0,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		revalidate
	};
}

//#endregion
exports.useSubscription = useSubscription;