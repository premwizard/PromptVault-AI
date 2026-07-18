import { BillingPaymentResource } from "../../types/billing.js";
import { PaginatedResources } from "../types.js";
import { HookParams } from "./createBillingPaginatedHook.js";

//#region src/react/hooks/usePaymentAttempts.d.ts
/**
 * @internal
 */
declare const usePaymentAttempts: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPaymentResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePaymentAttempts };