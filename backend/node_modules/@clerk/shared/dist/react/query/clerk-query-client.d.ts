import { QueryClient } from "@tanstack/query-core";

//#region src/react/query/clerk-query-client.d.ts
declare function getClerkQueryClient(): QueryClient | undefined;
/**
 * Test-only: install a custom client (for deterministic defaults like
 * `staleTime: Infinity`) or pass `undefined` to simulate the "no client"
 * state without triggering lazy creation on subsequent reads.
 */
declare function __setClerkQueryClientForTest(client: QueryClient | undefined): void;
/**
 * Test-only: build and install a fresh `QueryClient` with deterministic
 * defaults (no retries, infinite stale time, no refetching). Returns the
 * client so the spec can read/write its cache directly.
 *
 * Avoids forcing every test consumer to depend on `@tanstack/query-core`.
 */
declare function __createClerkTestQueryClient(): QueryClient;
/**
 * Test-only: clear both the override and the initialization flag so the
 * next read lazy-creates a fresh client.
 */
declare function __resetClerkQueryClientForTest(): void;
//#endregion
export { __createClerkTestQueryClient, __resetClerkQueryClientForTest, __setClerkQueryClientForTest, getClerkQueryClient };