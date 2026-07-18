import { BillingPlanResource } from "../../types/billing.js";
import { PaginatedResources } from "../types.js";
import { HookParams } from "./createBillingPaginatedHook.js";

//#region src/react/hooks/usePlans.d.ts
/**
 * @internal
 */
declare const usePlans: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPlanResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePlans };