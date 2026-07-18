import { BillingPaymentMethodResource } from "../../types/billing.js";
import { PaginatedResources } from "../types.js";
import { HookParams } from "./createBillingPaginatedHook.js";

//#region src/react/hooks/usePaymentMethods.d.ts
/**
 * @internal
 */
declare const usePaymentMethods: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPaymentMethodResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePaymentMethods };