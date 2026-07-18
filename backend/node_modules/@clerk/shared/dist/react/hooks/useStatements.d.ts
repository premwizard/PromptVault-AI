import { BillingStatementResource } from "../../types/billing.js";
import { PaginatedResources } from "../types.js";
import { HookParams } from "./createBillingPaginatedHook.js";

//#region src/react/hooks/useStatements.d.ts
/**
 * @internal
 */
declare const useStatements: <T extends HookParams>(params?: T | undefined) => PaginatedResources<BillingStatementResource, T extends {
  infinite: true;
} ? true : false>;
//#endregion
export { useStatements };