const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useOrganizationEnterpriseConnectionTestRuns_shared = require('./useOrganizationEnterpriseConnectionTestRuns.shared.js');
let react = require("react");

//#region src/react/hooks/useOrganizationEnterpriseConnectionTestRuns.tsx
const DEFAULT_POLL_INTERVAL_MS = 2e3;
/**
* Subscribes to the list of enterprise-connection test runs for the active organization
*
* @internal
*/
function useOrganizationEnterpriseConnectionTestRuns(params) {
	const { enterpriseConnectionId, params: fetchParams = {
		initialPage: 1,
		pageSize: 10
	}, pollIntervalMs = DEFAULT_POLL_INTERVAL_MS, enabled = true, keepPreviousData = false } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const { queryKey, invalidationKey, stableKey, authenticated } = require_useOrganizationEnterpriseConnectionTestRuns_shared.useOrganizationEnterpriseConnectionTestRunsCacheKeys({
		organizationId: organization?.id ?? null,
		enterpriseConnectionId,
		args: fetchParams
	});
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: organization === null,
		authenticated,
		stableKeys: stableKey
	});
	const queryEnabled = enabled && clerk.loaded && Boolean(organization) && Boolean(enterpriseConnectionId);
	const [shouldPoll, setShouldPoll] = (0, react.useState)(false);
	(0, react.useEffect)(() => {
		setShouldPoll(false);
	}, [enterpriseConnectionId]);
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => {
			if (!enterpriseConnectionId) throw new Error("enterpriseConnectionId is required to fetch test runs");
			return organization?.getEnterpriseConnectionTestRuns(enterpriseConnectionId, fetchParams);
		},
		refetchInterval: (q) => {
			if (!shouldPoll) return false;
			return (q.state.data?.data?.length ?? 0) > 0 ? false : pollIntervalMs;
		},
		enabled: queryEnabled,
		refetchIntervalInBackground: false,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	const hasRows = (query.data?.data?.length ?? 0) > 0;
	(0, react.useEffect)(() => {
		if (shouldPoll && hasRows) setShouldPoll(false);
	}, [shouldPoll, hasRows]);
	const revalidate = (0, react.useCallback)(async (options) => {
		if ((options?.armPolling ?? true) && !hasRows) setShouldPoll(true);
		if (options?.exact) await queryClient.invalidateQueries({
			queryKey,
			exact: true
		});
		else await queryClient.invalidateQueries({ queryKey: invalidationKey });
		const fresh = queryClient.getQueryData(queryKey);
		return {
			data: fresh?.data,
			totalCount: fresh?.total_count
		};
	}, [
		queryClient,
		invalidationKey,
		queryKey,
		hasRows
	]);
	const isPolling = queryEnabled && shouldPoll && !hasRows;
	return {
		data: query.data?.data,
		totalCount: query.data?.total_count,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		isPolling,
		revalidate
	};
}

//#endregion
exports.useOrganizationEnterpriseConnectionTestRuns = useOrganizationEnterpriseConnectionTestRuns;