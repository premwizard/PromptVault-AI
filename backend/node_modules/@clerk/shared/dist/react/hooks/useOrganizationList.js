const require_method_called = require('../../telemetry/events/method-called.js');
const require_contexts = require('../contexts.js');
const require_stable_keys = require('../stable-keys.js');
const require_createCacheKeys = require('./createCacheKeys.js');
const require_usePagesOrInfinite_shared = require('./usePagesOrInfinite.shared.js');
const require_usePagesOrInfinite = require('./usePagesOrInfinite.js');
const require_useUserBase = require('./base/useUserBase.js');
const require_useAttemptToEnableOrganizations = require('./useAttemptToEnableOrganizations.js');

//#region src/react/hooks/useOrganizationList.tsx
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
* The `useOrganizationList()` hook provides access to the current user's organization memberships, invitations, and suggestions. It also includes methods for creating new organizations and managing the active organization.
*
* @example
* ### Expanding and paginating attributes
*
* To keep network usage to a minimum, developers are required to opt-in by specifying which resource they need to fetch and paginate through. So by default, the `userMemberships`, `userInvitations`, and `userSuggestions` attributes are not populated. You must pass true or an object with the desired properties to fetch and paginate the data.
*
* ```tsx
* // userMemberships.data will never be populated
* const { userMemberships } = useOrganizationList()
*
* // Use default values to fetch userMemberships, such as initialPage = 1 and pageSize = 10
* const { userMemberships } = useOrganizationList({
*   userMemberships: true,
* })
*
* // Pass your own values to fetch userMemberships
* const { userMemberships } = useOrganizationList({
*   userMemberships: {
*     pageSize: 20,
*     initialPage: 2, // skips the first page
*   },
* })
*
* // Aggregate pages in order to render an infinite list
* const { userMemberships } = useOrganizationList({
*   userMemberships: {
*     infinite: true,
*   },
* })
* ```
*
* @example
* ### Infinite pagination
*
* The following example demonstrates how to use the `infinite` property to fetch and append new data to the existing list. The `userMemberships` attribute will be populated with the first page of the user's Organization memberships. When the "Load more" button is clicked, the `fetchNext` helper function will be called to append the next page of memberships to the list.
*
* ```tsx {{ filename: 'src/components/JoinedOrganizations.tsx' }}
* import { useOrganizationList } from '@clerk/react'
* import React from 'react'
*
* const JoinedOrganizations = () => {
*   const { isLoaded, setActive, userMemberships } = useOrganizationList({
*     userMemberships: {
*       infinite: true,
*     },
*   })
*
*   if (!isLoaded) {
*     return <>Loading</>
*   }
*
*   return (
*     <>
*       <ul>
*         {userMemberships.data?.map((mem) => (
*           <li key={mem.id}>
*             <span>{mem.organization.name}</span>
*             <button onClick={() => setActive({ organization: mem.organization.id })}>Select</button>
*           </li>
*         ))}
*       </ul>
*
*       <button disabled={!userMemberships.hasNextPage} onClick={() => userMemberships.fetchNext()}>
*         Load more
*       </button>
*     </>
*   )
* }
*
* export default JoinedOrganizations
* ```
*
* @example
* ### Simple pagination
*
* The following example demonstrates how to use the `fetchPrevious` and `fetchNext` helper functions to paginate through the data. The `userInvitations` attribute will be populated with the first page of invitations. When the "Previous page" or "Next page" button is clicked, the `fetchPrevious` or `fetchNext` helper function will be called to fetch the previous or next page of invitations.
*
* Notice the difference between this example's pagination and the infinite pagination example above.
*
* ```tsx {{ filename: 'src/components/UserInvitationsTable.tsx' }}
* import { useOrganizationList } from '@clerk/react'
* import React from 'react'
*
* const UserInvitationsTable = () => {
*   const { isLoaded, userInvitations } = useOrganizationList({
*     userInvitations: {
*       infinite: true,
*       keepPreviousData: true,
*     },
*   })
*
*   if (!isLoaded || userInvitations.isLoading) {
*     return <>Loading</>
*   }
*
*   return (
*     <>
*       <table>
*         <thead>
*           <tr>
*             <th>Email</th>
*             <th>Org name</th>
*           </tr>
*         </thead>
*
*         <tbody>
*           {userInvitations.data?.map((inv) => (
*             <tr key={inv.id}>
*               <th>{inv.emailAddress}</th>
*               <th>{inv.publicOrganizationData.name}</th>
*             </tr>
*           ))}
*         </tbody>
*       </table>
*
*       <button disabled={!userInvitations.hasPreviousPage} onClick={userInvitations.fetchPrevious}>
*         Prev
*       </button>
*       <button disabled={!userInvitations.hasNextPage} onClick={userInvitations.fetchNext}>
*         Next
*       </button>
*     </>
*   )
* }
*
* export default UserInvitationsTable
* ```
*/
function useOrganizationList(params) {
	const { userMemberships, userInvitations, userSuggestions } = params || {};
	require_contexts.useAssertWrappedByClerkProvider("useOrganizationList");
	require_useAttemptToEnableOrganizations.useAttemptToEnableOrganizations("useOrganizationList");
	const userMembershipsSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(userMemberships, {
		initialPage: 1,
		pageSize: 10,
		keepPreviousData: false,
		infinite: false
	});
	const userInvitationsSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(userInvitations, {
		initialPage: 1,
		pageSize: 10,
		status: "pending",
		keepPreviousData: false,
		infinite: false
	});
	const userSuggestionsSafeValues = require_usePagesOrInfinite_shared.useWithSafeValues(userSuggestions, {
		initialPage: 1,
		pageSize: 10,
		status: "pending",
		keepPreviousData: false,
		infinite: false
	});
	const clerk = require_contexts.useClerkInstanceContext();
	const user = require_useUserBase.useUserBase();
	clerk.telemetry?.record(require_method_called.eventMethodCalled("useOrganizationList"));
	const userMembershipsParams = typeof userMemberships === "undefined" ? void 0 : {
		initialPage: userMembershipsSafeValues.initialPage,
		pageSize: userMembershipsSafeValues.pageSize
	};
	const userInvitationsParams = typeof userInvitations === "undefined" ? void 0 : {
		initialPage: userInvitationsSafeValues.initialPage,
		pageSize: userInvitationsSafeValues.pageSize,
		status: userInvitationsSafeValues.status
	};
	const userSuggestionsParams = typeof userSuggestions === "undefined" ? void 0 : {
		initialPage: userSuggestionsSafeValues.initialPage,
		pageSize: userSuggestionsSafeValues.pageSize,
		status: userSuggestionsSafeValues.status
	};
	const isClerkLoaded = !!(clerk.loaded && user);
	const memberships = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: user?.getOrganizationMemberships,
		config: {
			keepPreviousData: userMembershipsSafeValues.keepPreviousData,
			infinite: userMembershipsSafeValues.infinite,
			enabled: !!userMembershipsParams,
			isSignedIn: user !== null,
			initialPage: userMembershipsSafeValues.initialPage,
			pageSize: userMembershipsSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.USER_MEMBERSHIPS_KEY,
			authenticated: true,
			tracked: { userId: user?.id },
			untracked: { args: userMembershipsParams }
		})
	});
	const invitations = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: user?.getOrganizationInvitations,
		config: {
			keepPreviousData: userInvitationsSafeValues.keepPreviousData,
			infinite: userInvitationsSafeValues.infinite,
			enabled: !!userInvitationsParams,
			isSignedIn: user !== null,
			initialPage: userInvitationsSafeValues.initialPage,
			pageSize: userInvitationsSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.USER_INVITATIONS_KEY,
			authenticated: true,
			tracked: { userId: user?.id },
			untracked: { args: userInvitationsParams }
		})
	});
	const suggestions = require_usePagesOrInfinite.usePagesOrInfinite({
		fetcher: user?.getOrganizationSuggestions,
		config: {
			keepPreviousData: userSuggestionsSafeValues.keepPreviousData,
			infinite: userSuggestionsSafeValues.infinite,
			enabled: !!userSuggestionsParams,
			isSignedIn: user !== null,
			initialPage: userSuggestionsSafeValues.initialPage,
			pageSize: userSuggestionsSafeValues.pageSize
		},
		keys: require_createCacheKeys.createCacheKeys({
			stablePrefix: require_stable_keys.STABLE_KEYS.USER_SUGGESTIONS_KEY,
			authenticated: true,
			tracked: { userId: user?.id },
			untracked: { args: userSuggestionsParams }
		})
	});
	if (!isClerkLoaded) return {
		isLoaded: false,
		createOrganization: void 0,
		setActive: void 0,
		userMemberships: undefinedPaginatedResource,
		userInvitations: undefinedPaginatedResource,
		userSuggestions: undefinedPaginatedResource
	};
	return {
		isLoaded: isClerkLoaded,
		setActive: clerk.setActive,
		createOrganization: clerk.createOrganization,
		userMemberships: memberships,
		userInvitations: invitations,
		userSuggestions: suggestions
	};
}

//#endregion
exports.useOrganizationList = useOrganizationList;