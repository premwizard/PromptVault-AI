import { EnterpriseConnectionTestRunResource, GetEnterpriseConnectionTestRunsParams } from "../../types/enterpriseConnectionTestRun.js";

//#region src/react/hooks/useOrganizationEnterpriseConnectionTestRuns.d.ts
type UseOrganizationEnterpriseConnectionTestRunsParams = {
  enterpriseConnectionId: string | null;
  /**
   * Pass-through fetch parameters (pagination, status filter).
   * Defaults to `{ initialPage: 1, pageSize: 10 }`.
   */
  params?: GetEnterpriseConnectionTestRunsParams;
  /**
   * Polling interval (ms) applied between `revalidate()` and the moment the
   * first record arrives in the response.
   *
   * @default 2000
   */
  pollIntervalMs?: number;
  /**
   * If `false`, the hook is dormant — no fetch, no polling.
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * When `true`, a background refetch keeps the previously-loaded page visible
   * (`isFetching` stays `true`, `isLoading` does not flip back to `true`) instead
   * of clearing to a cold-load state.
   *
   * @default false
   */
  keepPreviousData?: boolean;
};
/**
 * The freshly-fetched page surfaced by `revalidate`, read straight from the
 * cache once the refetch settles. Lets a caller gate on the up-to-date result
 * synchronously after `await`, instead of waiting for the hook to re-render with
 * the new React state (whose value is still the pre-refetch one inside the
 * caller's closure).
 */
type UseOrganizationEnterpriseConnectionTestRunsRevalidateResult = {
  data: EnterpriseConnectionTestRunResource[] | undefined;
  totalCount: number | undefined;
};
type UseOrganizationEnterpriseConnectionTestRunsReturn = {
  data: EnterpriseConnectionTestRunResource[] | undefined;
  totalCount: number | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  /**
   * `true` while the hook is actively polling for the first record to appear
   */
  isPolling: boolean;
  /**
   * Force a refetch, resolving with the freshly-fetched page once it settles.
   *
   * By default this also arms polling when the list is currently empty, so a run
   * kicked off elsewhere is picked up as it lands. Pass `{ armPolling: false }`
   * for an entry/pagination refetch that should never arm polling merely because
   * the list happens to be empty — polling is then armed only by an explicit
   * `revalidate()` (or `revalidate({ armPolling: true })`) after a run is kicked
   * off.
   */
  revalidate: (options?: RevalidateTestRunsOptions) => Promise<UseOrganizationEnterpriseConnectionTestRunsRevalidateResult>;
};
type RevalidateTestRunsOptions = {
  /**
   * Whether to arm polling for the first record when the list is currently
   * empty.
   *
   * @default true
   */
  armPolling?: boolean;
  /**
   * Invalidate only this query's exact `queryKey` instead of the broad
   * org+connection `invalidationKey`. The default broad invalidation
   * prefix-matches every test-runs query for the connection, so a sibling query
   * (e.g. a success probe sharing the org+connection key with the visible list)
   * refetches too. Pass `true` to refetch ONLY this query and leave the siblings
   * — and their loading indicators — untouched.
   *
   * @default false
   */
  exact?: boolean;
};
/**
 * Subscribes to the list of enterprise-connection test runs for the active organization
 *
 * @internal
 */
declare function useOrganizationEnterpriseConnectionTestRuns(params: UseOrganizationEnterpriseConnectionTestRunsParams): UseOrganizationEnterpriseConnectionTestRunsReturn;
//#endregion
export { UseOrganizationEnterpriseConnectionTestRunsParams, UseOrganizationEnterpriseConnectionTestRunsReturn, UseOrganizationEnterpriseConnectionTestRunsRevalidateResult, useOrganizationEnterpriseConnectionTestRuns };