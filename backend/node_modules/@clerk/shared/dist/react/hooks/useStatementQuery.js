const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useBillingIsEnabled = require('./useBillingIsEnabled.js');
const require_useStatementQuery_shared = require('./useStatementQuery.shared.js');

//#region src/react/hooks/useStatementQuery.tsx
/**
* @internal
*/
function useStatementQuery(params = {}) {
	const { statementId = null, keepPreviousData = false, for: forType = "user" } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const organizationId = forType === "organization" ? organization?.id ?? null : null;
	const { queryKey, stableKey, authenticated } = require_useStatementQuery_shared.useStatementQueryCacheKeys({
		statementId,
		userId: user?.id ?? null,
		orgId: organizationId,
		for: forType
	});
	const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled(params);
	const queryEnabled = Boolean(statementId) && billingEnabled;
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: user === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => {
			if (!statementId) throw new Error("statementId is required to fetch a statement");
			return clerk.billing.getStatement({
				id: statementId,
				orgId: organizationId ?? void 0
			});
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
exports.useStatementQuery = useStatementQuery;