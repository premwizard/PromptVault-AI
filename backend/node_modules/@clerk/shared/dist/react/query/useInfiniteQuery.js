const require_useBaseQuery = require('./useBaseQuery.js');
let _tanstack_query_core = require("@tanstack/query-core");

//#region src/react/query/useInfiniteQuery.ts
/**
*
*/
function useClerkInfiniteQuery(options) {
	return require_useBaseQuery.useBaseQuery(options, _tanstack_query_core.InfiniteQueryObserver);
}

//#endregion
exports.useClerkInfiniteQuery = useClerkInfiniteQuery;