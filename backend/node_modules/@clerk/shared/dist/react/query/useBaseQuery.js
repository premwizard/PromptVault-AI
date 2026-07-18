'use client';

const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_use_clerk_query_client = require('./use-clerk-query-client.js');
let react = require("react");
react = require_runtime.__toESM(react);
let _tanstack_query_core = require("@tanstack/query-core");

//#region src/react/query/useBaseQuery.ts
/**
* Stripped down version of useBaseQuery from @tanstack/query-core.
* This implementation allows for an observer to be created every time a query client changes.
*/
/**
* An alternative `useBaseQuery` implementation that allows for an observer to be created every time a query client changes.
*
* @internal
*/
function useBaseQuery(options, Observer) {
	const [client, isQueryClientLoaded] = require_use_clerk_query_client.useClerkQueryClient();
	const defaultedOptions = isQueryClientLoaded ? client.defaultQueryOptions(options) : options;
	defaultedOptions._optimisticResults = "optimistic";
	const observer = react.useMemo(() => {
		return new Observer(client, defaultedOptions);
	}, [client]);
	const result = observer.getOptimisticResult(defaultedOptions);
	const shouldSubscribe = options.subscribed !== false;
	react.useSyncExternalStore(react.useCallback((onStoreChange) => {
		const unsubscribe = shouldSubscribe ? observer.subscribe(_tanstack_query_core.notifyManager.batchCalls(onStoreChange)) : _tanstack_query_core.noop;
		observer.updateResult();
		return unsubscribe;
	}, [observer, shouldSubscribe]), () => observer.getCurrentResult(), () => observer.getCurrentResult());
	react.useEffect(() => {
		observer.setOptions(defaultedOptions);
	}, [defaultedOptions, observer]);
	if (!isQueryClientLoaded) return {
		data: void 0,
		error: null,
		isLoading: options.enabled !== false,
		isFetching: false,
		status: "pending"
	};
	return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

//#endregion
exports.useBaseQuery = useBaseQuery;