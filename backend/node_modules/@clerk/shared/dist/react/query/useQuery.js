const require_useBaseQuery = require('./useBaseQuery.js');
let _tanstack_query_core = require("@tanstack/query-core");

//#region src/react/query/useQuery.ts
/**
*
*/
function useClerkQuery(options) {
	return require_useBaseQuery.useBaseQuery(options, _tanstack_query_core.QueryObserver);
}

//#endregion
exports.useClerkQuery = useClerkQuery;