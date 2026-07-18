import { OrganizationDomainResource } from "../../types/organizationDomain.mjs";
import { OrganizationInvitationResource } from "../../types/organizationInvitation.mjs";
import { OrganizationMembershipRequestResource } from "../../types/organizationMembershipRequest.mjs";
import { GetDomainsParams, GetInvitationsParams, GetMembersParams, GetMembershipRequestParams, OrganizationResource } from "../../types/organization.mjs";
import { OrganizationMembershipResource } from "../../types/organizationMembership.mjs";
import { PaginatedHookConfig, PaginatedResources, PaginatedResourcesWithDefault } from "../types.mjs";

//#region src/react/hooks/useOrganization.d.ts
/**
 * @interface
 */
type UseOrganizationParams = {
  /**
   * If set to `true`, all default properties will be used.<br />
   * Otherwise, accepts an object with the following optional properties:
   * <ul>
   *  <li>`enrollmentMode`: A string that filters the domains by the provided [enrollment mode](https://clerk.com/docs/guides/organizations/add-members/verified-domains#enable-verified-domains).</li>
   *  <li>Any of the properties described in [Shared properties](#shared-properties).</li>
   * </ul>
   */
  domains?: true | PaginatedHookConfig<GetDomainsParams>;
  /**
   * If set to `true`, all default properties will be used.<br />
   * Otherwise, accepts an object with the following optional properties:
   * <ul>
   *  <li>`status`: A string that filters the membership requests by the provided status.</li>
   *  <li>Any of the properties described in [Shared properties](#shared-properties).</li>
   * </ul>
   */
  membershipRequests?: true | PaginatedHookConfig<GetMembershipRequestParams>;
  /**
   * If set to `true`, all default properties will be used.<br />
   * Otherwise, accepts an object with the following optional properties:
   * <ul>
   *  <li>`role`: An array of [`OrganizationCustomRoleKey`](https://clerk.com/docs/reference/types/organization-custom-role-key).</li>
   *  <li>`query`: A string that filters the memberships by the provided string.</li>
   *  <li>Any of the properties described in [Shared properties](#shared-properties).</li>
   * </ul>
   */
  memberships?: true | PaginatedHookConfig<GetMembersParams>;
  /**
   * If set to `true`, all default properties will be used.<br />
   * Otherwise, accepts an object with the following optional properties:
   * <ul>
   *  <li>`status`: A string that filters the invitations by the provided status.</li>
   *  <li>Any of the properties described in [Shared properties](#shared-properties).</li>
   * </ul>
   */
  invitations?: true | PaginatedHookConfig<GetInvitationsParams>;
};
/**
 * @interface
 */
type UseOrganizationReturn<T extends UseOrganizationParams> = {
  /**
   * Indicates whether Clerk has loaded the current authentication state. Initially `false`, becomes `true` once Clerk loads, and can revert to `false` while auth state is updating (for example, when switching organizations via [`setActive()`](https://clerk.com/docs/reference/objects/clerk#set-active)).
   */
  isLoaded: false;
  /**
   * The currently Active Organization.
   */
  organization: undefined;
  /**
   * The current Organization membership.
   */
  membership: undefined;
  /**
   * Includes a paginated list of the Organization's domains.
   */
  domains: PaginatedResourcesWithDefault<OrganizationDomainResource>;
  /**
   * Includes a paginated list of the Organization's membership requests.
   */
  membershipRequests: PaginatedResourcesWithDefault<OrganizationMembershipRequestResource>;
  /**
   * Includes a paginated list of the Organization's memberships.
   */
  memberships: PaginatedResourcesWithDefault<OrganizationMembershipResource>;
  /**
   * Includes a paginated list of the Organization's invitations.
   */
  invitations: PaginatedResourcesWithDefault<OrganizationInvitationResource>;
} | {
  isLoaded: true;
  organization: OrganizationResource;
  membership: undefined;
  domains: PaginatedResourcesWithDefault<OrganizationDomainResource>;
  membershipRequests: PaginatedResourcesWithDefault<OrganizationMembershipRequestResource>;
  memberships: PaginatedResourcesWithDefault<OrganizationMembershipResource>;
  invitations: PaginatedResourcesWithDefault<OrganizationInvitationResource>;
} | {
  isLoaded: boolean;
  organization: OrganizationResource | null;
  membership: OrganizationMembershipResource | null | undefined;
  domains: PaginatedResources<OrganizationDomainResource, T['membershipRequests'] extends {
    infinite: true;
  } ? true : false> | null;
  membershipRequests: PaginatedResources<OrganizationMembershipRequestResource, T['membershipRequests'] extends {
    infinite: true;
  } ? true : false> | null;
  memberships: PaginatedResources<OrganizationMembershipResource, T['memberships'] extends {
    infinite: true;
  } ? true : false> | null;
  invitations: PaginatedResources<OrganizationInvitationResource, T['invitations'] extends {
    infinite: true;
  } ? true : false> | null;
};
/**
 * The `useOrganization()` hook retrieves attributes of the currently Active Organization.
 *
 * @example
 * ### Expand and paginate attributes
 *
 * To keep network usage to a minimum, developers are required to opt-in by specifying which resource they need to fetch and paginate through. By default, the `memberships`, `invitations`, `membershipRequests`, and `domains` attributes are not populated. You must pass `true` or an object with the desired properties to fetch and paginate the data.
 *
 * ```tsx
 * // invitations.data will never be populated.
 * const { invitations } = useOrganization()
 *
 * // Use default values to fetch invitations, such as initialPage = 1 and pageSize = 10
 * const { invitations } = useOrganization({
 *   invitations: true,
 * })
 *
 * // Pass your own values to fetch invitations
 * const { invitations } = useOrganization({
 *   invitations: {
 *     pageSize: 20,
 *     initialPage: 2, // skips the first page
 *   },
 * })
 *
 * // Aggregate pages in order to render an infinite list
 * const { invitations } = useOrganization({
 *   invitations: {
 *     infinite: true,
 *   },
 * })
 * ```
 *
 * @example
 * ### Infinite pagination
 *
 * The following example demonstrates how to use the `infinite` property to fetch and append new data to the existing list. The `memberships` attribute will be populated with the first page of the Organization's memberships. When the "Load more" button is clicked, the `fetchNext` helper function will be called to append the next page of memberships to the list.
 *
 * ```tsx
 * import { useOrganization } from '@clerk/react'
 *
 * export default function MemberList() {
 *   const { memberships } = useOrganization({
 *     memberships: {
 *       infinite: true, // Append new data to the existing list
 *       keepPreviousData: true, // Persist the cached data until the new data has been fetched
 *     },
 *   })
 *
 *   if (!memberships) {
 *     // Handle loading state
 *     return null
 *   }
 *
 *   return (
 *     <div>
 *       <h2>Organization members</h2>
 *       <ul>
 *         {memberships.data?.map((membership) => (
 *           <li key={membership.id}>
 *             {membership.publicUserData.firstName} {membership.publicUserData.lastName} <
 *             {membership.publicUserData.identifier}> :: {membership.role}
 *           </li>
 *         ))}
 *       </ul>
 *
 *       <button
 *         disabled={!memberships.hasNextPage} // Disable the button if there are no more available pages to be fetched
 *         onClick={memberships.fetchNext}
 *       >
 *         Load more
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 *
 * @example
 * ### Simple pagination
 *
 * The following example demonstrates how to use the `fetchPrevious` and `fetchNext` helper functions to paginate through the data. The `memberships` attribute will be populated with the first page of the Organization's memberships. When the "Previous page" or "Next page" button is clicked, the `fetchPrevious` or `fetchNext` helper function will be called to fetch the previous or next page of memberships.
 *
 * Notice the difference between this example's pagination and the infinite pagination example above.
 *
 * ```tsx
 * import { useOrganization } from '@clerk/react'
 *
 * export default function MemberList() {
 *   const { memberships } = useOrganization({
 *     memberships: {
 *       keepPreviousData: true, // Persist the cached data until the new data has been fetched
 *     },
 *   })
 *
 *   if (!memberships) {
 *     // Handle loading state
 *     return null
 *   }
 *
 *   return (
 *     <div>
 *       <h2>Organization members</h2>
 *       <ul>
 *         {memberships.data?.map((membership) => (
 *           <li key={membership.id}>
 *             {membership.publicUserData.firstName} {membership.publicUserData.lastName} <
 *             {membership.publicUserData.identifier}> :: {membership.role}
 *           </li>
 *         ))}
 *       </ul>
 *
 *       <button disabled={!memberships.hasPreviousPage} onClick={memberships.fetchPrevious}>
 *         Previous page
 *       </button>
 *
 *       <button disabled={!memberships.hasNextPage} onClick={memberships.fetchNext}>
 *         Next page
 *       </button>
 *     </div>
 *   )
 * }
 * ```
 */
declare function useOrganization<T extends UseOrganizationParams>(params?: T): UseOrganizationReturn<T>;
//#endregion
export { useOrganization };