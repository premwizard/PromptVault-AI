import { BillingPlanResource } from "../../types/billing.mjs";
import { PaginatedResources } from "../types.mjs";
import { HookParams } from "./createBillingPaginatedHook.mjs";

//#region src/react/hooks/usePlans.d.ts
/**
 * @internal
 */
declare const usePlans: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPlanResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePlans };