let _tanstack_query_core = require("@tanstack/query-core");

//#region src/react/query/clerk-query-client.ts
/**
* The QueryClient backing every clerk-query hook. Owned by `@clerk/shared` so the
* `QueryObserver` that observes it and the `Query` objects inside it always
* resolve to the same `@tanstack/query-core` (no cross-bundle drift between
* the consumer-side `@clerk/shared` and the production CDN `clerk-js` bundle).
*
* Lazily instantiated on the client only. Server-side renders return
* `undefined` so per-request renders never share a cache across requests.
*/
let clerkQueryClient;
let initialized = false;
function getClerkQueryClient() {
	if (typeof window === "undefined") return;
	if (!initialized) {
		clerkQueryClient = new _tanstack_query_core.QueryClient();
		initialized = true;
	}
	return clerkQueryClient;
}
/**
* Test-only: install a custom client (for deterministic defaults like
* `staleTime: Infinity`) or pass `undefined` to simulate the "no client"
* state without triggering lazy creation on subsequent reads.
*/
function __setClerkQueryClientForTest(client) {
	clerkQueryClient = client;
	initialized = true;
}
/**
* Test-only: build and install a fresh `QueryClient` with deterministic
* defaults (no retries, infinite stale time, no refetching). Returns the
* client so the spec can read/write its cache directly.
*
* Avoids forcing every test consumer to depend on `@tanstack/query-core`.
*/
function __createClerkTestQueryClient() {
	const client = new _tanstack_query_core.QueryClient({ defaultOptions: { queries: {
		retry: false,
		staleTime: Infinity,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false
	} } });
	__setClerkQueryClientForTest(client);
	return client;
}
/**
* Test-only: clear both the override and the initialization flag so the
* next read lazy-creates a fresh client.
*/
function __resetClerkQueryClientForTest() {
	clerkQueryClient = void 0;
	initialized = false;
}

//#endregion
exports.__createClerkTestQueryClient = __createClerkTestQueryClient;
exports.__resetClerkQueryClientForTest = __resetClerkQueryClientForTest;
exports.__setClerkQueryClientForTest = __setClerkQueryClientForTest;
exports.getClerkQueryClient = getClerkQueryClient;