const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
let react = require("react");

//#region src/react/hooks/usePaymentAttemptQuery.shared.ts
function usePaymentAttemptQueryCacheKeys(params) {
	const { paymentAttemptId, userId, orgId, for: forType } = params;
	return (0, react.useMemo)(() => {
		return require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.INTERNAL_STABLE_KEYS.PAYMENT_ATTEMPT_KEY,
			authenticated: true,
			tracked: {
				paymentAttemptId,
				forType,
				userId,
				orgId
			},
			untracked: { args: {
				id: paymentAttemptId ?? void 0,
				orgId: orgId ?? void 0
			} }
		});
	}, [
		paymentAttemptId,
		forType,
		userId,
		orgId
	]);
}

//#endregion
exports.usePaymentAttemptQueryCacheKeys = usePaymentAttemptQueryCacheKeys;