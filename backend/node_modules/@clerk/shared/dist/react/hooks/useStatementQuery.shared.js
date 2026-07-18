const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/useStatementQuery.shared.ts
function useStatementQueryCacheKeys(params) {
	const { statementId, userId, orgId, for: forType } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.BILLING_STATEMENTS_KEY,
			authenticated: true,
			tracked: {
				statementId,
				forType,
				userId,
				orgId
			},
			untracked: { args: {
				id: statementId ?? void 0,
				orgId: orgId ?? void 0
			} }
		});
	}, [
		statementId,
		forType,
		userId,
		orgId
	]);
}

//#endregion
exports.useStatementQueryCacheKeys = useStatementQueryCacheKeys;