import { BillingCreditBalanceResource, ForPayerType } from "../../types/billing.js";
//#region src/react/hooks/useCreditBalance.d.ts
type UseCreditBalanceParams = {
  for?: ForPayerType;
  keepPreviousData?: boolean;
  enabled?: boolean;
};
type CreditBalanceResult = {
  data: BillingCreditBalanceResource | undefined | null;
  error: Error | undefined;
  isLoading: boolean;
  isFetching: boolean;
  revalidate: () => Promise<void> | void;
};
/**
 * @internal
 */
declare function __internal_useCreditBalanceQuery(params?: UseCreditBalanceParams): CreditBalanceResult;
//#endregion
export { __internal_useCreditBalanceQuery };