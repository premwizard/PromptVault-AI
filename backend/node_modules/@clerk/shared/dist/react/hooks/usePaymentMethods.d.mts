import { BillingPaymentMethodResource } from "../../types/billing.mjs";
import { PaginatedResources } from "../types.mjs";
import { HookParams } from "./createBillingPaginatedHook.mjs";

//#region src/react/hooks/usePaymentMethods.d.ts
/**
 * @internal
 */
declare const usePaymentMethods: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingPaymentMethodResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { usePaymentMethods };