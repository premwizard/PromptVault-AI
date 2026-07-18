const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useBillingIsEnabled = require('./useBillingIsEnabled.js');
const require_usePaymentAttemptQuery_shared = require('./usePaymentAttemptQuery.shared.js');

//#region src/react/hooks/usePaymentAttemptQuery.tsx
/**
* @internal
*/
function usePaymentAttemptQuery(params) {
	const { paymentAttemptId, keepPreviousData = false, for: forType = "user" } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const organizationId = forType === "organization" ? organization?.id ?? null : null;
	const { queryKey, stableKey, authenticated } = require_usePaymentAttemptQuery_shared.usePaymentAttemptQueryCacheKeys({
		paymentAttemptId,
		userId: user?.id ?? null,
		orgId: organizationId,
		for: forType
	});
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled(params);
	const queryEnabled = Boolean(paymentAttemptId) && billingEnabled;
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: user === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: ({ queryKey }) => {
			const args = queryKey[3].args;
			return clerk.billing.getPaymentAttempt(args);
		},
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData),
		staleTime: 1e3 * 60
	});
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching
	};
}

//#endregion
exports.usePaymentAttemptQuery = usePaymentAttemptQuery;