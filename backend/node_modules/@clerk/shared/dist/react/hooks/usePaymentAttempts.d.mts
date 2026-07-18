import { BillingPaymentResource } from "../../types/billing.mjs";
import { PaginatedResources } from "../types.mjs";
import { HookParams } from "./createBillingPaginatedHook.mjs";

//#region src/react/hooks/usePaymentAttempts.d.ts
/**
 * @internal
 */
declare const usePaymentAttempts: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPaymentResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePaymentAttempts };