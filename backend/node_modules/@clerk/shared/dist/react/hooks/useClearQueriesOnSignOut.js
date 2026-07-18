const require_use_clerk_query_client = require('../query/use-clerk-query-client.js');
const require_usePreviousValue = require('./usePreviousValue.js');
let react = require("react");

//#region src/react/hooks/useClearQueriesOnSignOut.ts
const withInfiniteKey = (key) => [key, `${key}-inf`];
/**
* Clears React Query caches associated with the given stable prefixes when
* the authenticated state transitions from signed-in to signed-out.
*
* @internal
*/
function useClearQueriesOnSignOut(options) {
	const { isSignedOut, stableKeys, authenticated = true, onCleanup } = options;
	const stableKeysRef = (0, react.useRef)(stableKeys);
	const [queryClient] = require_use_clerk_query_client.useClerkQueryClient();
	const previousIsSignedIn = require_usePreviousValue.usePreviousValue(!isSignedOut);
	(0, react.useEffect)(() => {
		if (authenticated !== true) return;
		if (previousIsSignedIn && isSignedOut === true) {
			queryClient.removeQueries({ predicate: (query) => {
				const [cachedStableKey, queryAuthenticated] = query.queryKey;
				return queryAuthenticated === true && typeof cachedStableKey === "string" && (Array.isArray(stableKeysRef.current) ? stableKeysRef.current.includes(cachedStableKey) : stableKeysRef.current === cachedStableKey);
			} });
			onCleanup?.();
		}
	}, [
		authenticated,
		isSignedOut,
		previousIsSignedIn,
		queryClient
	]);
}

//#endregion
exports.useClearQueriesOnSignOut = useClearQueriesOnSignOut;
exports.withInfiniteKey = withInfiniteKey;