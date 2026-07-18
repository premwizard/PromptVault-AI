const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
const require_usePagesOrInfinite_shared = require('./usePagesOrInfinite.shared.js');
const require_usePagesOrInfinite = require('./usePagesOrInfinite.js');

//#region src/react/hooks/useAPIKeys.tsx
/**
* The `useAPIKeys()` hook provides access to paginated API keys for the current user or organization.
*
* @example
* ### Basic usage with default pagination
*
* ```tsx
* const { data, isLoading, page, pageCount, fetchNext, fetchPrevious } = useAPIKeys({
*   subject: 'user_123',
*   pageSize: 10,
*   initialPage: 1,
* });
* ```
*
* @example
* ### With search query
*
* ```tsx
* const [searchValue, setSearchValue] = useState('');
* const debouncedSearch = useDebounce(searchValue, 500);
*
* const { data, isLoading } = useAPIKeys({
*   subject: 'user_123',
*   query: debouncedSearch.trim(),
*   pageSize: 10,
* });
* ```
*
* @example
* ### Infinite scroll
*
* ```tsx
* const { data, isLoading, fetchNext, hasNextPage } = useAPIKeys({
*   subject: 'user_123',
*   infinite: true,
* });
* ```
*/
function useAPIKeys(params) {
	require_contexts.useAssertWrappedByClerkProvider("useAPIKeys");
	const safeValues = require_usePagesOrInfinite_shared.useWithSafeValues(params, {
		initialPage: 1,
		pageSize: 10,
		keepPreviousData: false,
		infinite: false,
		subject: "",
		query: "",
		enabled: true
	});
	const clerk = require_contexts.useClerkInstanceContext();
	clerk.telemetry?.record(require_method_called.eventMethodCalled("useAPIKeys"));
	const hookParams = {
		initialPage: safeValues.initialPage,
		pageSize: safeValues.pageSize,
		...safeValues.subject ? { subject: safeValues.subject } : {},
		...safeValues.query ? { query: safeValues.query } : {}
	};
	const isEnabled = (safeValues.enabled ?? true) && clerk.loaded;
	return require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: clerk.apiKeys?.getAll ? (params) => clerk.apiKeys.getAll({
			...params,
			subject: safeValues.subject
		}) : void 0,
		config: {
			keepPreviousData: safeValues.keepPreviousData,
			infinite: safeValues.infinite,
			enabled: isEnabled,
			isSignedIn: clerk.user !== null,
			initialPage: safeValues.initialPage,
			pageSize: safeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.API_KEYS_KEY,
			authenticated: true,
			tracked: { subject: safeValues.subject },
			untracked: { args: hookParams }
		})
	});
}

//#endregion
exports.useAPIKeys = useAPIKeys;