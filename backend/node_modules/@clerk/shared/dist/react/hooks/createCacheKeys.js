
//#region src/react/hooks/createCacheKeys.ts
/**
* @internal
*/
function createCacheKeys(params) {
	return {
		queryKey: [
			params.stablePrefix,
			params.authenticated,
			params.tracked,
			params.untracked
		],
		invalidationKey: [
			params.stablePrefix,
			params.authenticated,
			params.tracked
		],
		stableKey: params.stablePrefix,
		authenticated: params.authenticated
	};
}

//#endregion
exports.createCacheKeys = createCacheKeys;