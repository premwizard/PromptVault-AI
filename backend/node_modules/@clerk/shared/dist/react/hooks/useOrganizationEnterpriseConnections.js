const require_contexts = require('../contexts.js');
const require_keep_previous_data = require('../query/keep-previous-data.js');
const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_useQuery = require('../query/useQuery.js');
const require_useClearQueriesOnSignOut = require('./useClearQueriesOnSignOut.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useOrganizationEnterpriseConnections_shared = require('./useOrganizationEnterpriseConnections.shared.js');
let react = require("react");

//#region src/react/hooks/useOrganizationEnterpriseConnections.tsx
/**
* Enterprise connections for the active organization
*
* @internal
*/
function useOrganizationEnterpriseConnections(params = {}) {
	const { keepPreviousData = true, enabled = true, withOrganizationAccountLinking = false } = params;
	const clerk = require_contexts.useClerkInstanceContext();
	const organization = require_useOrganizationBase.useOrganizationBase();
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const { queryKey, stableKey, authenticated } = require_useOrganizationEnterpriseConnections_shared.useOrganizationEnterpriseConnectionsCacheKeys({
		organizationId: organization?.id ?? null,
		withOrganizationAccountLinking
	});
	const queryEnabled = enabled && clerk.loaded && Boolean(organization);
	require_useClearQueriesOnSignOut.useClearQueriesOnSignOut({
		isSignedOut: organization === null,
		authenticated,
		stableKeys: stableKey
	});
	const query = require_useQuery.useClerkQuery({
		queryKey,
		queryFn: () => organization?.getEnterpriseConnections({ withOrganizationAccountLinking }),
		enabled: queryEnabled,
		placeholderData: require_keep_previous_data.defineKeepPreviousDataFn(keepPreviousData)
	});
	const revalidate = (0, react.useCallback)(() => queryClient.invalidateQueries({ queryKey: [stableKey] }), [queryClient, stableKey]);
	const createEnterpriseConnection = (0, react.useCallback)(async (createParams) => {
		const created = await organization?.createEnterpriseConnection(createParams);
		await revalidate();
		return created;
	}, [organization, revalidate]);
	const updateEnterpriseConnection = (0, react.useCallback)(async (enterpriseConnectionId, updateParams) => {
		const updated = await organization?.updateEnterpriseConnection(enterpriseConnectionId, updateParams);
		await revalidate();
		return updated;
	}, [organization, revalidate]);
	const deleteEnterpriseConnection = (0, react.useCallback)(async (enterpriseConnectionId) => {
		const deleted = await organization?.deleteEnterpriseConnection(enterpriseConnectionId);
		await revalidate();
		return deleted;
	}, [organization, revalidate]);
	return {
		data: query.data,
		error: query.error ?? null,
		isLoading: query.isLoading,
		isFetching: query.isFetching,
		createEnterpriseConnection,
		updateEnterpriseConnection,
		deleteEnterpriseConnection,
		revalidate
	};
}

//#endregion
exports.useOrganizationEnterpriseConnections = useOrganizationEnterpriseConnections;