import { OrganizationDomainResource, OrganizationDomainsBulkOwnershipVerificationResource, OrganizationEnrollmentMode } from "../../types/organizationDomain.js";

//#region src/react/hooks/useOrganizationDomains.d.ts
type UseOrganizationDomainsParams = {
  enabled?: boolean;
  keepPreviousData?: boolean;
  /**
   * Filter the returned domains by enrollment mode.
   */
  enrollmentMode?: OrganizationEnrollmentMode;
  /**
   * Invoked from the ownership-verification poll whenever an `attempt` resolves
   * one or more domains as `verified`.
   */
  onOwnershipVerified?: (verifiedDomains: OrganizationDomainResource[]) => void | Promise<void>;
};
type UseOrganizationDomainsReturn = {
  data: OrganizationDomainResource[] | undefined;
  totalCount: number | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  /**
   * Creates a new domain for the active organization, derived from the given name.
   */
  createDomain: (name: string) => Promise<OrganizationDomainResource | undefined>;
  /**
   * Issues a fresh TXT challenge for each of the given domains in a single
   * request. Each resolved domain's `ownershipVerification` carries the
   * `txtRecordName` and `txtRecordValue`.
   */
  prepareOwnershipVerification: (domains: OrganizationDomainResource[]) => Promise<OrganizationDomainsBulkOwnershipVerificationResource | undefined>;
  /**
   * Resolves the published TXT records for the given domains to complete ownership verification.
   */
  attemptOwnershipVerification: (domains: OrganizationDomainResource[]) => Promise<OrganizationDomainsBulkOwnershipVerificationResource | undefined>;
  revalidate: () => Promise<void>;
};
/**
 * Domains for the active organization.
 *
 * @internal
 */
declare function useOrganizationDomains(params?: UseOrganizationDomainsParams): UseOrganizationDomainsReturn;
//#endregion
export { UseOrganizationDomainsParams, UseOrganizationDomainsReturn, useOrganizationDomains };