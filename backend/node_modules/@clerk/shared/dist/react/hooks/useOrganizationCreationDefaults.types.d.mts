import { ClerkAPIResponseError } from "../../errors/clerkApiResponseError.mjs";
import { OrganizationCreationDefaultsResource } from "../../types/organizationCreationDefaults.mjs";
//#region src/react/hooks/useOrganizationCreationDefaults.types.d.ts
/**
 * @interface
 */
type UseOrganizationCreationDefaultsParams = {
  /**
   * If true, the previous data will be kept in the cache until new data is fetched.
   *
   * @default true
   */
  keepPreviousData?: boolean;
  /**
   * If `true`, a request will be triggered when the hook is mounted.
   *
   * @default true
   */
  enabled?: boolean;
};
/**
 * @interface
 */
type UseOrganizationCreationDefaultsReturn = {
  /**
   * The organization creation defaults resource, `undefined` before the first fetch, or `null` if not available.
   */
  data: OrganizationCreationDefaultsResource | undefined | null;
  /**
   * Any error that occurred during the data fetch, or `null` if no error occurred.
   */
  error: ClerkAPIResponseError | null;
  /**
   * Indicates whether the initial data is still being fetched.
   */
  isLoading: boolean;
  /**
   * Indicates whether any request is still in flight, including background updates.
   */
  isFetching: boolean;
};
//#endregion
export { UseOrganizationCreationDefaultsParams, UseOrganizationCreationDefaultsReturn };