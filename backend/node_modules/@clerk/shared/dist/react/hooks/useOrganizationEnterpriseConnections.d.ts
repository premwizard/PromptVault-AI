import { DeletedObjectResource } from "../../types/deletedObject.js";
import { CreateOrganizationEnterpriseConnectionParams, EnterpriseConnectionResource, UpdateOrganizationEnterpriseConnectionParams } from "../../types/enterpriseConnection.js";

//#region src/react/hooks/useOrganizationEnterpriseConnections.d.ts
type UseOrganizationEnterpriseConnectionsParams = {
  enabled?: boolean;
  keepPreviousData?: boolean;
  withOrganizationAccountLinking?: boolean;
};
type UseOrganizationEnterpriseConnectionsReturn = {
  data: EnterpriseConnectionResource[] | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  createEnterpriseConnection: (params: CreateOrganizationEnterpriseConnectionParams) => Promise<EnterpriseConnectionResource | undefined>;
  updateEnterpriseConnection: (enterpriseConnectionId: string, params: UpdateOrganizationEnterpriseConnectionParams) => Promise<EnterpriseConnectionResource | undefined>;
  deleteEnterpriseConnection: (enterpriseConnectionId: string) => Promise<DeletedObjectResource | undefined>;
  revalidate: () => Promise<void>;
};
/**
 * Enterprise connections for the active organization
 *
 * @internal
 */
declare function useOrganizationEnterpriseConnections(params?: UseOrganizationEnterpriseConnectionsParams): UseOrganizationEnterpriseConnectionsReturn;
//#endregion
export { UseOrganizationEnterpriseConnectionsParams, UseOrganizationEnterpriseConnectionsReturn, useOrganizationEnterpriseConnections };