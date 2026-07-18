import { ClerkPaginatedResponse } from "../../types/pagination.mjs";
import { BillingCreditLedgerResource, ForPayerType } from "../../types/billing.mjs";
//#region src/react/hooks/useCreditHistory.d.ts
type UseCreditHistoryParams = {
  for?: ForPayerType;
  enabled?: boolean;
};
type CreditHistoryResult = {
  data: ClerkPaginatedResponse<BillingCreditLedgerResource> | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isFetching: boolean;
  revalidate: () => Promise<void> | void;
};
/**
 * @internal
 */
declare function __internal_useCreditHistoryQuery(params?: UseCreditHistoryParams): CreditHistoryResult;
//#endregion
export { __internal_useCreditHistoryQuery };