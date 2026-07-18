const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useOrganizationEnterpriseConnectionTestRuns.shared.ts
/**
* @internal
*/
function useOrganizationEnterpriseConnectionTestRunsCacheKeys(params) {
	const { organizationId, enterpriseConnectionId, args } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.ORGANIZATION_ENTERPRISE_CONNECTION_TEST_RUNS_KEY,
			authenticated: Boolean(organizationId),
			tracked: {
				organizationId: organizationId ?? null,
				enterpriseConnectionId: enterpriseConnectionId ?? null
			},
			untracked: { args }
		});
	}, [
		organizationId,
		enterpriseConnectionId,
		JSON.stringify(args)
	]);
}

//#endregion
exports.useOrganizationEnterpriseConnectionTestRunsCacheKeys = useOrganizationEnterpriseConnectionTestRunsCacheKeys;