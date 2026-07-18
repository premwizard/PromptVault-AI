const require_clerk_query_client = require('./clerk-query-client.js');

//#region src/react/query/use-clerk-query-client.ts
/**
* Creates a recursively self-referential Proxy that safely handles:
* - Arbitrary property access (e.g., obj.any.prop.path)
* - Function calls at any level (e.g., obj.a().b.c())
* - Construction (e.g., new obj.a.b())
*
* Always returns itself to allow infinite chaining without throwing.
*/
function createRecursiveProxy(label) {
	const callableTarget = function noop() {};
	let self;
	self = new Proxy(callableTarget, {
		get(_target, prop) {
			if (prop === "then") return;
			if (prop === "toString") return () => `[${label}]`;
			if (prop === Symbol.toPrimitive) return () => 0;
			return self;
		},
		apply() {
			return self;
		},
		construct() {
			return self;
		},
		has() {
			return false;
		},
		set() {
			return false;
		}
	});
	return self;
}
const mockQueryClient = createRecursiveProxy("ClerkMockQueryClient");
/**
* Returns `[client, isLoaded]`. The real client is owned by `@clerk/shared`
* and lazily instantiated on the browser only — SSR returns the proxy mock
* + `isLoaded: false` so per-request renders never share a query cache.
*/
const useClerkQueryClient = () => {
	const client = require_clerk_query_client.getClerkQueryClient();
	return [client ?? mockQueryClient, Boolean(client)];
};

//#endregion
exports.useClerkQueryClient = useClerkQueryClient;