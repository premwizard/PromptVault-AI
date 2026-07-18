const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useUserEnterpriseConnections_shared = require('./useUserEnterpriseConnections.shared.js');
let react = require("react");

//#region src/react/hooks/useUserEnterpriseConnections.tsx
/**
* Enterprise connections for the signed-in user
*
* @internal
*/
function useUserEnterpriseConnections(params = {}) {
	const { keepPreviousData = true, enabled = true, withOrganizationAccountLinking = false } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const { queryKey, stableKey, authenticated } = require_useUserEnterpriseConnections_shared.useUserEnterpriseConnectionsCacheKeys({
		userId: user?.id ?? null,
		withOrganizationAccountLinking
	});
	const queryEnabled = enabled && clerk.loaded && Boolean(user);
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: user === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => user?.getEnterpriseConnections({ withOrganizationAccountLinking }),
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	const revalidate = (0, react.useCallback)(() => queryClient.invalidateQueries({ queryKey: [stableKey] }), [queryClient, stableKey]);
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		revalidate
	};
}

//#endregion
exports.useUserEnterpriseConnections = useUserEnterpriseConnections;