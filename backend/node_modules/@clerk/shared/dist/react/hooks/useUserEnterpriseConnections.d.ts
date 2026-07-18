import { EnterpriseConnectionResource } from "../../types/enterpriseConnection.js";

//#region src/react/hooks/useUserEnterpriseConnections.d.ts
type UseUserEnterpriseConnectionsParams = {
  enabled?: boolean;
  keepPreviousData?: boolean;
  withOrganizationAccountLinking?: boolean;
};
type UseUserEnterpriseConnectionsReturn = {
  data: EnterpriseConnectionResource[] | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  revalidate: () => Promise<void>;
};
/**
 * Enterprise connections for the signed-in user
 *
 * @internal
 */
declare function useUserEnterpriseConnections(params?: UseUserEnterpriseConnectionsParams): UseUserEnterpriseConnectionsReturn;
//#endregion
export { UseUserEnterpriseConnectionsParams, UseUserEnterpriseConnectionsReturn, useUserEnterpriseConnections };