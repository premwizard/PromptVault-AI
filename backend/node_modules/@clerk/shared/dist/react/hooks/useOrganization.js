const require_organization = require('../../organization.js');
const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
const require_usePagesOrInfinite_shared = require('./usePagesOrInfinite.shared.js');
const require_usePagesOrInfinite = require('./usePagesOrInfinite.js');
const require_useOrganizationBase = require('./base/useOrganizationBase.js');
const require_useSessionBase = require('./base/useSessionBase.js');
const require_useAttemptToEnableOrganizations = require('./useAttemptToEnableOrganizations.js');

//#region src/react/hooks/useOrganization.tsx
const undefinedPaginatedResource = {
	data: void 0,
	count: void 0,
	error: void 0,
	isLoading: false,
	isFetching: false,
	isError: false,
	page: void 0,
	pageCount: void 0,
	fetchPage: void 0,
	fetchNext: void 0,
	fetchPrevious: void 0,
	hasNextPage: false,
	hasPreviousPage: false,
	revalidate: void 0,
	setData: void 0
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
function useOrganization(params) {
	const { domains: domainListParams, membershipRequests: membershipRequestsListParams, memberships: membersListParams, invitations: invitationsListParams } = params || {};
	require_contexts.useAssertWrappedByClerkProvider("useOrganization");
	require_useAttemptToEnableOrganizations.useAttemptToEnableOrganizations("useOrganization");
	const organization = require_useOrganizationBase.useOrganizationBase();
	const session = require_useSessionBase.useSessionBase();
	const domainSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(domainListParams, {
		initialPage: 1,
		pageSize: 10,
		keepPreviousData: false,
		infinite: false,
		enrollmentMode: void 0
	});
	const membershipRequestSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(membershipRequestsListParams, {
		initialPage: 1,
		pageSize: 10,
		status: "pending",
		keepPreviousData: false,
		infinite: false
	});
	const membersSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(membersListParams, {
		initialPage: 1,
		pageSize: 10,
		role: void 0,
		keepPreviousData: false,
		infinite: false,
		query: void 0
	});
	const invitationsSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(invitationsListParams, {
		initialPage: 1,
		pageSize: 10,
		status: ["pending"],
		keepPreviousData: false,
		infinite: false
	});
	const clerk = require_contexts.useClerkInstanceContext();
	clerk.telemetry?.record(require_method_called.eventMethodCalled("useOrganization"));
	const domainParams = typeof domainListParams === "undefined" ? void 0 : {
		initialPage: domainSafeValues.initialPage,
		pageSize: domainSafeValues.pageSize,
		enrollmentMode: domainSafeValues.enrollmentMode
	};
	const membershipRequestParams = typeof membershipRequestsListParams === "undefined" ? void 0 : {
		initialPage: membershipRequestSafeValues.initialPage,
		pageSize: membershipRequestSafeValues.pageSize,
		status: membershipRequestSafeValues.status
	};
	const membersParams = typeof membersListParams === "undefined" ? void 0 : {
		initialPage: membersSafeValues.initialPage,
		pageSize: membersSafeValues.pageSize,
		role: membersSafeValues.role,
		query: membersSafeValues.query
	};
	const invitationsParams = typeof invitationsListParams === "undefined" ? void 0 : {
		initialPage: invitationsSafeValues.initialPage,
		pageSize: invitationsSafeValues.pageSize,
		status: invitationsSafeValues.status
	};
	const domains = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: organization?.getDomains,
		config: {
			keepPreviousData: domainSafeValues.keepPreviousData,
			infinite: domainSafeValues.infinite,
			enabled: !!domainParams,
			isSignedIn: organization !== null,
			initialPage: domainSafeValues.initialPage,
			pageSize: domainSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.DOMAINS_KEY,
			authenticated: true,
			tracked: { organizationId: organization?.id },
			untracked: { args: domainParams }
		})
	});
	const membershipRequests = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: organization?.getMembershipRequests,
		config: {
			keepPreviousData: membershipRequestSafeValues.keepPreviousData,
			infinite: membershipRequestSafeValues.infinite,
			enabled: !!membershipRequestParams,
			isSignedIn: organization !== null,
			initialPage: membershipRequestSafeValues.initialPage,
			pageSize: membershipRequestSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.MEMBERSHIP_REQUESTS_KEY,
			authenticated: true,
			tracked: { organizationId: organization?.id },
			untracked: { args: membershipRequestParams }
		})
	});
	const memberships = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: organization?.getMemberships,
		config: {
			keepPreviousData: membersSafeValues.keepPreviousData,
			infinite: membersSafeValues.infinite,
			enabled: !!membersParams,
			isSignedIn: organization !== null,
			initialPage: membersSafeValues.initialPage,
			pageSize: membersSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.MEMBERSHIPS_KEY,
			authenticated: true,
			tracked: { organizationId: organization?.id },
			untracked: { args: membersParams }
		})
	});
	const invitations = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: organization?.getInvitations,
		config: {
			keepPreviousData: invitationsSafeValues.keepPreviousData,
			infinite: invitationsSafeValues.infinite,
			enabled: !!invitationsParams,
			isSignedIn: organization !== null,
			initialPage: invitationsSafeValues.initialPage,
			pageSize: invitationsSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.INVITATIONS_KEY,
			authenticated: true,
			tracked: { organizationId: organization?.id },
			untracked: { args: invitationsParams }
		})
	});
	if (organization === void 0) return {
		isLoaded: false,
		organization: void 0,
		membership: void 0,
		domains: undefinedPaginatedResource,
		membershipRequests: undefinedPaginatedResource,
		memberships: undefinedPaginatedResource,
		invitations: undefinedPaginatedResource
	};
	if (organization === null) return {
		isLoaded: true,
		organization: null,
		membership: null,
		domains: null,
		membershipRequests: null,
		memberships: null,
		invitations: null
	};
	/** In SSR context we include only the organization object when loadOrg is set to true. */
	if (!clerk.loaded && organization) return {
		isLoaded: true,
		organization,
		membership: void 0,
		domains: undefinedPaginatedResource,
		membershipRequests: undefinedPaginatedResource,
		memberships: undefinedPaginatedResource,
		invitations: undefinedPaginatedResource
	};
	return {
		isLoaded: clerk.loaded,
		organization,
		membership: require_organization.getCurrentOrganizationMembership(session.user.organizationMemberships, organization.id),
		domains,
		membershipRequests,
		memberships,
		invitations
	};
}

//#endregion
exports.useOrganization = useOrganization;