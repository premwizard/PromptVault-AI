import { GetAPIKeysParams } from "../../types/clerk.mjs";
import { APIKeyResource } from "../../types/apiKeys.mjs";
import { PaginatedHookConfig, PaginatedResources } from "../types.mjs";

//#region src/react/hooks/useAPIKeys.d.ts
/**
 * @interface
 */
type UseAPIKeysParams = PaginatedHookConfig<GetAPIKeysParams & {
  /**
   * If `true`, a request will be triggered when the hook is mounted.
   *
   * @default true
   */
  enabled?: boolean;
}>;
/**
 * @interface
 */
type UseAPIKeysReturn<T extends UseAPIKeysParams> = PaginatedResources<APIKeyResource, T extends {
  infinite: true;
} ? true : false>;
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
declare function useAPIKeys<T extends UseAPIKeysParams>(params?: T): UseAPIKeysReturn<T>;
//#endregion
export { useAPIKeys };