const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_createCacheKeys = require('./createCacheKeys.js');
const require_usePagesOrInfinite_shared = require('./usePagesOrInfinite.shared.js');
const require_usePagesOrInfinite = require('./usePagesOrInfinite.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useBillingIsEnabled = require('./useBillingIsEnabled.js');

//#region src/react/hooks/createBillingPaginatedHook.tsx
/**
* A hook factory that creates paginated data fetching hooks for commerce-related resources.
* It provides a standardized way to create hooks that can fetch either user or Organization resources
* with built-in pagination support.
*
* The generated hooks handle:
* - Clerk authentication context
* - Resource-specific data fetching
* - Pagination (both traditional and infinite scroll)
* - Telemetry tracking
* - Type safety for the specific resource.
*
* @internal
*/
function createBillingPaginatedHook({ hookName, resourceType, useFetcher, options }) {
	return function useBillingHook(params) {
		const { for: _for, enabled: externalEnabled, ...paginationParams } = params || {};
		const safeFor = _for || "user";
		require_contexts.useAssertWrappedByClerkProvider(hookName);
		const fetchFn = useFetcher(safeFor);
		const safeValues = require_usePagesOrInfinite_shared.useWithSafeValues(paginationParams, {
			initialPage: 1,
			pageSize: 10,
			keepPreviousData: false,
			infinite: false,
			__experimental_mode: void 0
		});
		const clerk = require_contexts.useClerkInstanceContext();
		const user = require_useUserBase.useUserBase();
		const organization = require_useOrganizationBase.useOrganizationBase();
		clerk.telemetry?.record(require_method_called.eventMethodCalled(hookName));
		const isForOrganization = safeFor === "organization";
		const billingEnabled = require_useBillingIsEnabled.useBillingIsEnabled({
			for: safeFor,
			enabled: externalEnabled,
			authenticated: !options?.unauthenticated
		});
		const hookParams = typeof paginationParams === "undefined" ? void 0 : {
			initialPage: safeValues.initialPage,
			pageSize: safeValues.pageSize,
			...options?.unauthenticated ? {} : isForOrganization ? { orgId: organization?.id } : {}
		};
		const isEnabled = !!hookParams && clerk.loaded && !!billingEnabled;
		return require_usePagesOrInfinite.usePagesOrInfinite({
			fetcher: fetchFn,
			config: {
				keepPreviousData: safeValues.keepPreviousData,
				infinite: safeValues.infinite,
				enabled: isEnabled,
				...options?.unauthenticated ? {} : { isSignedIn: user !== null },
				__experimental_mode: safeValues.__experimental_mode,
				initialPage: safeValues.initialPage,
				pageSize: safeValues.pageSize
			},
			keys: require_createCacheKeys.createCacheKeys({
				stablePrefix: resourceType,
				authenticated: !options?.unauthenticated,
				tracked: options?.unauthenticated ? { for: safeFor } : {
					userId: user?.id,
					...isForOrganization ? { orgId: organization?.id } : {}
				},
				untracked: { args: hookParams }
			})
		});
	};
}

//#endregion
exports.createBillingPaginatedHook = createBillingPaginatedHook;