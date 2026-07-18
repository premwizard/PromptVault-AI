const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useBillingIsEnabled = require('./useBillingIsEnabled.js');
const require_usePlanDetailsQuery_shared = require('./usePlanDetailsQuery.shared.js');

//#region src/react/hooks/usePlanDetailsQuery.tsx
/**
* @internal
*/
function __internal_usePlanDetailsQuery(params = {}) {
	const { planId, initialPlan = null, keepPreviousData = true } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const targetPlanId = planId ?? initialPlan?.id ?? null;
	const { queryKey } = require_usePlanDetailsQuery_shared.usePlanDetailsQueryCacheKeys({ planId: targetPlanId });
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled({ authenticated: false });
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => {
			if (!targetPlanId) throw new Error("planId is required to fetch plan details");
			return clerk.billing.getPlan({ id: targetPlanId });
		},
		enabled: Boolean(targetPlanId) && billingEnabled,
		initialData: initialPlan ?? void 0,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData),
		initialDataUpdatedAt: 0
	});
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching
	};
}

//#endregion
exports.__internal_usePlanDetailsQuery = __internal_usePlanDetailsQuery;