import { ForPayerType } from "../../types/billing.mjs";
import { PagesOrInfiniteOptions, PaginatedHookConfig } from "../types.mjs";

//#region src/react/hooks/createBillingPaginatedHook.d.ts
/**
 * @interface
 * @standalonePage
 */
interface HookParams extends PaginatedHookConfig<PagesOrInfiniteOptions & {
  /**
   * If `true`, a request will be triggered when the hook is mounted.
   *
   * @default true
   */
  enabled?: boolean;
  /**
   * On `cache` mode, no request will be triggered when the hook is mounted and the data will be fetched from the cache.
   *
   * @default undefined
   *
   * @hidden
   *
   * @experimental
   */
  __experimental_mode?: 'cache';
}> {
  /**
   * Specifies whether to fetch for the current user or Organization.
   *
   * @default 'user'
   */
  for?: ForPayerType;
}
//#endregion
export { HookParams };