import { BillingStatementResource } from "../../types/billing.mjs";
import { PaginatedResources } from "../types.mjs";
import { HookParams } from "./createBillingPaginatedHook.mjs";

//#region src/react/hooks/useStatements.d.ts
/**
 * @internal
 */
declare const useStatements: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingStatementResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { useStatements };